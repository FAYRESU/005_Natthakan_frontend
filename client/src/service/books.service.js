import api from "./api";

const BOOKS_API = import.meta.env.VITE_BOOKS_API;

const getAllBooks = async () => await api.get(`${BOOKS_API}`);
const getBooksById = async (id) => api.get(`${BOOKS_API}/${id}`);
const editBooksById = async (id, data) => api.put(`${BOOKS_API}/${id}`, data);
const insertBooks = async (data) => api.post(`${BOOKS_API}`, data);
const deleteBook = async (id) => api.delete(`${BOOKS_API}/${id}`);

const BooksService = {
  getAllBooks,
  getBooksById,
  editBooksById,
  insertBooks,
  deleteBook,
};

export default BooksService;
