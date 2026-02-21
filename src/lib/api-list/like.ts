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
  } catch (error: any) {
    return {
      code: "500",
      message: "Failed to like product, please try again.",
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
  } catch (error: any) {
    return {
      code: "500",
      message: "Failed to unlike product, please try again.",
    };
  }
};
