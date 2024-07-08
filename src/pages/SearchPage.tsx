import React, { useState } from "react";
import SearchBooks from "../components/SearchBooks";
import { fetchBooks } from "../api";
import BookList from "../components/BookList";
import ImageBox from "../components/ImageBox";
import AnimatedBeats from "../components/AnimatedBeat";
import CategoryList from "../components/CategoryList";

const SearchPage = () => {
  const [books, setBooks] = useState([]);

  const handleSearch = async (query) => {
    const response = await fetchBooks(query);
    setBooks(response.data.items);
  };

  return (
    <div>
      <ImageBox query={"books"} />
      <SearchBooks onSearch={handleSearch} />
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <div className="loadingbox">
          <p className="search-load">Search for books.. </p>
          <CategoryList/>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
