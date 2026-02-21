import api from "../api";

// GET
export const getCart = async () => {
  try {
    const response = await api.get({ url: "/carts", withToken: true });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// POST
export const addToCart = async ({ foodId }: { foodId: string }) => {
  try {
    const form = new FormData();
    form.append("foodId", foodId);
    const response = await api.post({
      url: "/carts",
      data: form,
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
