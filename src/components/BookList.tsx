import React from "react";
import { Link } from "react-router-dom";
import "./booklist.css";

const BookList = ({ books }) => {
  return (
    <div className="booklist-container">
      {books.map((book) => {

        return book?.volumeInfo?.imageLinks?.thumbnail?(
          <Link to={`/book/${book.id}`} className="book">
            <img
              src={book?.volumeInfo?.imageLinks?.thumbnail}
              className="book-img"
            />
            <h3 className="title">{book.volumeInfo.title}</h3>
            <p className="author grey-text">
              by {book.volumeInfo.authors?.join(", ")}
            </p>
          </Link>
        ):<></>;
      })}
    </div>
  );
};

export default BookList;
