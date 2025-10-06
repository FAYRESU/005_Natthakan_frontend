import api from "./api";

const JOURNALS_API = import.meta.env.VITE_JOURNALS_API;

const getAllJournals = async () => await api.get(`${JOURNALS_API}`);
const getJournalsById = async (id) => api.get(`${JOURNALS_API}/${id}`);
const editlJournalsById = async (id, data) => api.put(`${JOURNALS_API}/${id}`, data);
const insertJournals = async (data) => api.post(`${JOURNALS_API}`, data);
const deleteJournals = async (id) => api.delete(`${JOURNALS_API}/${id}`);

const JournalsService = {
  getAllJournals,
  getJournalsById,
  editlJournalsById,
  insertJournals, 
  deleteJournals,
};

export default JournalsService;
