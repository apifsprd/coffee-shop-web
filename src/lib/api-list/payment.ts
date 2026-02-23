import api from "../api";

export const getPaymentMethods = async () => {
  try {
    const response = await api.get({
      url: "/payment-methods",
      withToken: false,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
