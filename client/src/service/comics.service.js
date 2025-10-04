import api from "./api";

const COMICS_API = import.meta.env.VITE_COMICS_API;

// GET all restaurants
const getAllComics = async () => await api.get(`${COMICS_API}`);

// GET by ID
const getComicsById = async (id) => api.get(`${COMICS_API}/${id}`);

// UPDATE by ID
const editComicsById = async (id, data) => api.put(`${COMICS_API}/${id}`, data);

// ADD new restaurant
const insertComics = async (data) => api.post(`${COMICS_API}`, data);

// DELETE by ID
const deleteComics = async (id) => api.delete(`${COMICS_API}/${id}`);

const ComicsService = {
  getAllComics,
  getComicsById,
  editComicsById,
  insertComics,
  deleteComics,
};

export default ComicsService;
