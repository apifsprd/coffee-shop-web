import api from "../api";
import { foodForm } from "../types/food";

export const getFoods = async () => {
  try {
    const response = await api.get({ url: "/foods", withToken: true });
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
export const getFoodbyID = async (foodId: string) => {
  try {
    const response = await api.get({
      url: `/foods/${foodId}`,
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
export const getLikedFoods = async () => {
  try {
    const response = await api.get({ url: "/like-foods", withToken: true });
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};

// POST
export const createFood = async ({ payload }: { payload: foodForm }) => {
  try {
    const response = await api.post({
      url: `/create-food`,
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
export const updateFood = async ({
  foodID,
  payload,
}: {
  foodID: string;
  payload: {
    name: string;
    description: string;
    imageUrl: string;
    ingredients: Array<string>;
  };
}) => {
  try {
    const response = await api.post({
      url: `/update-food/${foodID}`,
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
// DELETE
export const deleteFood = async ({ foodID }: { foodID: string }) => {
  try {
    const response = await api.delete({
      url: `/delete-food/${foodID}`,
      data: {},
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
