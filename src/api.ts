import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1';

export const fetchBooks = (query:string) => {
  return axios.get(`${BASE_URL}/volumes?q=${query}`);
};

export const fetchBooksByCategory = (category:string) => {
  return axios.get(`${BASE_URL}/volumes?q=subject:${category}`);
};

export const fetchBookDetails = (id:string) => {
  return axios.get(`${BASE_URL}/volumes/${id}`);
};
