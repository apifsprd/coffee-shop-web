import api from "../api";

export const getFoods = async () => {
  try {
    const response = await api.get({ url: "/foods", withToken: true });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const getLikedFoods = async () => {
  try {
    const response = await api.get({ url: "/like-foods", withToken: true });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
