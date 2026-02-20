import api from "../api";

// POST
export const likeFood = async ({ payload }) => {
  try {
    const form = new FormData();
    form.append("foodId", payload.foodId);
    const response = await api.post("/like", form);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const unlikeFood = async ({ payload }) => {
  try {
    const response = await api.post("/unlike", payload);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
