import api from "./api";

const BOOKS_API = import.meta.env.VITE_BOOKS_API;

// GET all restaurants
const getAllBooks = async () => await api.get(`${BOOKS_API}`);

// GET by ID
const getBooksById = async (id) => api.get(`${BOOKS_API}/${id}`);

// UPDATE by ID
const editBooksById = async (id, data) => api.put(`${BOOKS_API}/${id}`, data);

// ADD new restaurant
const insertBooks = async (data) => api.post(`${BOOKS_API}`, data);

// DELETE by ID
const deleteBook = async (id) => api.delete(`${BOOKS_API}/${id}`);

const BooksService = {
  getAllBooks,
  getBooksById,
  editBooksById,
  insertBooks,
  deleteBook,
};

export default BooksService;
