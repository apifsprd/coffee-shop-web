import api from "../api";

export const addToCart = async (payload: { foodId: string }) => {
  try {
    const form = new FormData();
    form.append("foodId", payload.foodId);
    const response = await api.post("/add-cart", form);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
