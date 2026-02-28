import api from "../api";

export const getPaymentMethods = async () => {
  try {
    const response = await api.get({
      url: "/payment-methods",
      withToken: false,
    });
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
