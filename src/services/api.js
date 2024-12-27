import axios from "axios";

const API_KEY = "e5c2f64a";
const BASE_URL = "http://www.omdbapi.com/";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/", {
      params: { s: query, page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
