import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBooksByCategory } from "../api";
import BookList from "../components/BookList";
import ImageBox from "../components/ImageBox";

const CategoriesPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetchBooksByCategory(category ||  '');
      setBooks(response.data.items);
    };

    getBooks();
  }, [category]);

  return (
    <div>
      <ImageBox query={category || ''} showBackBtn />
      <p className="headline">Some {category} Books for you ..</p>
      {books && <BookList books={books} />}
    </div>
  );
};

export default CategoriesPage;
