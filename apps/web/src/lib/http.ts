import axios from "axios";
import { API_URL } from "./config";
import { Depth } from "./types/httpClientTypes";

export const getDepth = async (eventId: string): Promise<Depth> => {
  const response = await axios.get(`${API_URL}/depth/${eventId}`);
  return response.data.data.payload.depth;
};
