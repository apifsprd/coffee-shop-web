import api from "../api";

// POST
export const likeFood = async (foodId: string) => {
  try {
    const payload = new FormData();
    payload.append("foodId", foodId);
    const response = await api.post({
      url: "/like",
      data: payload,
      withToken: true,
    });
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};

export const unlikeFood = async (foodId: string) => {
  try {
    const payload = new FormData();
    payload.append("foodId", foodId);
    const response = await api.post({
      url: "/unlike",
      data: payload,
      withToken: true,
    });
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
