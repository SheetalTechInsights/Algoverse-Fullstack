import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getPatterns = async () => {
  const response = await axios.get(`${API_BASE_URL}/patterns`);
  return response.data;
};
