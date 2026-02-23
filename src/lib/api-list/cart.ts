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
      url: "/add-cart",
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
