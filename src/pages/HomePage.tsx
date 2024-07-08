import { useEffect } from "react";
import CategoryList from "../components/CategoryList";
import SearchBooks from "../components/SearchBooks";
import { useState } from "react";
import BookList from "../components/BookList";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageBox from "../components/ImageBox";

const HomePage = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:life&maxResults=10`
        );
        setRecommendedBooks(response.data.items);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    };

    fetchRecommendedBooks();
  }, []);

  const handleSearch = () => {
    navigate('/search')
  };

  return (
    <div>
      <ImageBox query={"library"} />
      <Link to={'/search'}>
        <SearchBooks onSearch={handleSearch} />
      </Link>

      <CategoryList />
      <h2 className="headline">Recommended Books</h2>
      {recommendedBooks && <BookList books={recommendedBooks} />}
    </div>
  );
};

export default HomePage;
