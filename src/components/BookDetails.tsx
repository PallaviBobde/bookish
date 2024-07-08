import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchBookDetails } from "../api";
import "./bookdetails.css";
import { RiPagesLine } from "react-icons/ri";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import AnimatedBeats from "./AnimatedBeat";
import { IoMdArrowRoundBack } from "react-icons/io";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState<{
    volumeInfo: {
      imageLinks: {
        thumbnail: string;
      };
      authors: string[];
      title: string;
      description: string;
      pageCount: number;
      averageRating: number;
      ratingsCount: number;
      categories: string[];
      infoLink:string;
    };
    id: string;
  } | null>(null);

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await fetchBookDetails(id);
      setBook(response.data);
    };

    getBookDetails();
  }, [id]);

  const [isSpeaking, setIsSpeaking] = useState(false);
  let utterance = null;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getVoices = () => {
    return window.speechSynthesis.getVoices();
  };

  function extractTextFromHTML(html:string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const speak = () => {
    if (!book?.volumeInfo?.description) return;

    utterance = new SpeechSynthesisUtterance(
      extractTextFromHTML(book.volumeInfo.description)
    );
    utterance.rate = 0.6;
    utterance.pitch = 1.0;
    utterance.voice = getVoices().find((voice) => voice.lang === "en-US") || null;
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);

    utteranceRef.current = utterance;
  };

  const stopSpeaking = () => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <>
      <div className="box">
        <IoMdArrowRoundBack size={24} onClick={() => navigate(-1)} />
        {book ? (
          <>
            <div className="top-box-book-detail">
              <div className="top-div">
                <img src={book.volumeInfo.imageLinks.thumbnail} />
                {book?.volumeInfo?.description && (
                  <>
                    {isSpeaking ? (
                      <button
                        onClick={stopSpeaking}
                        disabled={!isSpeaking}
                        className="play-pause"
                      >
                        <FaPause />
                      </button>
                    ) : (
                      <button
                        onClick={speak}
                        disabled={isSpeaking}
                        className="play-pause"
                      >
                        <FaPlay />
                      </button>
                    )}
                    {isSpeaking && <AnimatedBeats />}
                  </>
                )}
              </div>

              <div>
                <h1>{book.volumeInfo.title}</h1>
                <p>{book.volumeInfo.authors?.join(", ")}</p>
              </div>
            </div>

            <div className="info-box">
              {book.volumeInfo.pageCount && (
                <div className="info-box-inner-box grey-text">
                  <p>{book.volumeInfo.pageCount}</p>
                  <p>
                    <RiPagesLine className="icon" />
                    Pages
                  </p>
                </div>
              )}

              {book.volumeInfo.averageRating && (
                <div className="info-box-inner-box grey-text">
                  <p>{book.volumeInfo.averageRating}</p>
                  <p>
                    <FaRegStar className="icon" />
                    Avg. rating
                  </p>
                </div>
              )}

              {book.volumeInfo.ratingsCount && (
                <div className="info-box-inner-box grey-text">
                  <p>{book.volumeInfo.ratingsCount}</p>
                  <p>
                    <MdOutlinePeopleOutline className="icon" />
                    Ratings
                  </p>
                </div>
              )}
            </div>

            <div className="tag-box">
              {book.volumeInfo.categories.slice(0, 5).map((i) => {
                return <p className="tag" key={i}>{i}</p>;
              })}
            </div>
            {book?.volumeInfo?.description && (
              <div className="description-container">
                <p className="grey-text about-text">About the book: </p>
                <span
                  dangerouslySetInnerHTML={{
                    __html: book.volumeInfo.description,
                  }}
                />
              </div>
            )}

            <Link
              to={book.volumeInfo.infoLink}
              target="_blank"
              className="link"
            >
              View more info
            </Link>
          </>
        ) : (
          <div className="search-load">Loading...</div>
        )}
      </div>
    </>
  );
};

export default BookDetails;
