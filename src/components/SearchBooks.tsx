import React from "react";
import { FormEvent, useState } from "react";
import './search.css';
import { FaSearch } from "react-icons/fa";

const SearchBooks = ({ onSearch }:{
  onSearch:(q:string)=>void;
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
        className="inputbox"
      />
      <button type="submit" className="search-btn">
        <FaSearch size={24} />
      </button>
    </form>
  );
};

export default SearchBooks;
