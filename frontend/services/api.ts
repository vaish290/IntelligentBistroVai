import axios from "axios";

const API_BASE_URL = "http://192.168.198.1:5001";

export const getMenu = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/menu`
  );

  return response.data;
};
export const sendOrderMessage = async (message: string, cart: any[]) => {
  const response = await axios.post(`${API_BASE_URL}/api/ai/order`, {
    message,
    cart,
  });

  return response.data;
};

export const createPaymentIntent = async (cart: any[]) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/payment/create-payment-intent`,
    {
      cart,
    }
  );

  return response.data;
};

export const saveOrder = async (order: any) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/orders`,
    order
  );

  return response.data;
};