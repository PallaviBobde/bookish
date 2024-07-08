import { useEffect, useState } from "react";
import "./categorylist.css";
import axios from "axios";
import './imagebox.css';
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ImageBox = ({ query, showBackBtn =false}:{
  query:string,showBackBtn:boolean
}) => {
  const [images, setImages] = useState<
    {
      id: string;
      urls: {
        regular: string;
      };
      alt_description:string;
    }[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "qKab_o2u4SM2N99PMREfhLiMFkTWIrnPvLUJPhlG3IM",
              query: query,
              per_page: 10, // Number of images per page
            },
          }
        );
        setImages(response.data.results);
      } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
      }
    };

    fetchImages();
  }, [query]);

  return (
    <div className="img-container">
      {showBackBtn && (
        <IoMdArrowRoundBack size={24} onClick={() => navigate(-1)} className="backicon"/>
      )}

      <h1 className="img-text">{query == "library" ? "Bookishhh" : query}</h1>
      <img
        key={images[0]?.id}
        src={images[0]?.urls?.regular || ""}
        alt={images[0]?.alt_description}
        className="hero-img"
      />
    </div>
  );
};

export default ImageBox;
