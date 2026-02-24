import api from "../api";

export const createRating = async (payload: {
  foodId: string;
  rating: number;
  review: string;
}) => {
  try {
    const formObj = {
      rating: payload.rating,
      review: payload.review,
    };
    const response = await api.post({
      url: `/rate-food/${payload.foodId}`,
      data: formObj,
      withToken: true,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
