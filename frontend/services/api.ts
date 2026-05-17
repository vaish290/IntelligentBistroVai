import axios from "axios";

const API_BASE_URL = "http://192.168.1.69:5001";

export const sendOrderMessage = async (message: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/ai/order`, {
    message,
  });

  return response.data;
};