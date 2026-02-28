import api from "../api";

// GET
export const getCart = async () => {
  try {
    const response = await api.get({ url: "/carts", withToken: true });
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};

// POST
export const addToCart = async ({ foodId }: { foodId: string }) => {
  try {
    const form = new FormData();
    form.append("foodId", foodId);
    const response = await api.post({
      url: "/add-cart",
      data: form,
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
export const updateQtyCart = async ({
  cartID,
  qty,
}: {
  cartID: string;
  qty: number;
}) => {
  try {
    const form = {
      quantity: Number(qty),
    };
    const response = await api.post({
      url: "/update-cart/" + cartID,
      data: form,
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
export const removeFromCart = async ({ cartId }: { cartId: string }) => {
  try {
    const form = new FormData();
    const response = await api.delete({
      url: "/delete-cart/" + cartId,
      data: form,
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
