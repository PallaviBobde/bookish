import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1';

export const fetchBooks = (query) => {
  return axios.get(`${BASE_URL}/volumes?q=${query}`);
};

export const fetchBooksByCategory = (category) => {
  return axios.get(`${BASE_URL}/volumes?q=subject:${category}`);
};

export const fetchBookDetails = (id) => {
  return axios.get(`${BASE_URL}/volumes/${id}`);
};
