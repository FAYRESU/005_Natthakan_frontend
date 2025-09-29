import api from "./api";

const JOURNALS_API = import.meta.env.VITE_JOURNALS_API;

// GET all restaurants
const getAllJournals = async () => await api.get(`${JOURNALS_API}`);

// GET by ID
const getJournalsById = async (id) => api.get(`${JOURNALS_API}/${id}`);

// UPDATE by ID
const editJournalsById = async (id, data) => api.put(`${JOURNALS_API}/${id}`, data);

// ADD new restaurant
const insertJournals = async (data) => api.post(`${JOURNALS_API}`, data);

// DELETE by ID
const deleteJournals = async (id) => api.delete(`${JOURNALS_API}/${id}`);

const JournalsService = {
  getAllBooks,
  getBooksById,
  editBooksById,
  insertBooks,
  deleteBooks,
};

export default JournalsService;
