import api from "./api";

const COMICS_API = import.meta.env.VITE_COMICS_API;

const getAllComics = async () => await api.get(`${COMICS_API}`);
const getComicsById = async (id) => api.get(`${COMICS_API}/${id}`);
const editlComicsById = async (id, data) => api.put(`${COMICS_API}/${id}`, data);
const insertComics = async (data) => api.post(`${COMICS_API}`, data);
const deleteComics = async (id) => api.delete(`${COMICS_API}/${id}`);

const ComicsService = {
  getAllComics,
  getComicsById,
  editlComicsById,
  insertComics, 
  deleteComics,
};

export default ComicsService;
