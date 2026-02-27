import api from "../api";
import { Profile, User } from "../types/auth";

// GET
export const getAllUser = async () => {
  try {
    const response = await api.get({
      url: "/all-user",
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

// POST
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
export const updateUserRole = async ({
  userID,
  payload,
}: {
  userID: string;
  payload: { role: string };
}) => {
  try {
    const response = await api.post({
      url: `/update-user-role/${userID}`,
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
