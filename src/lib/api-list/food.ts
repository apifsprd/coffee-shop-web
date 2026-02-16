import api from "../api";

export const getFoods = async () => {
  try {
    const response = await api.get({ url: "/api/v1/foods" });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
