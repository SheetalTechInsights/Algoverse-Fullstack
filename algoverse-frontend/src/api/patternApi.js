import axios from "axios";
import { API_BASE_URL } from "./config"; // agar ye file bhi src root mein hai to "./config", warna adjust karo

export const getPatterns = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/patterns`);
  return response.data;
};