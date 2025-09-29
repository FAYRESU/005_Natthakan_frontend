import api from "./api";

const ITEMS_API = import.meta.env.VITE_ITEMS_API;

// GET all restaurants
const getAllItems = async () => await api.get(`${ITEMS_API}`);

// GET by ID
const getItemsById = async (id) => api.get(`${ITEMS_API}/${id}`);

const itemService = {
  getAllItems,
  getItemsById,
};

export default itemService;
