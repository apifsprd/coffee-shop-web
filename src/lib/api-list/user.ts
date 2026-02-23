import api from "../api";
import { Profile, User } from "../types/auth";

export const updateProfile = async ({ payload }: { payload: Profile }) => {
  try {
    const response = await api.post({
      url: "/update-profile",
      data: payload,
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
