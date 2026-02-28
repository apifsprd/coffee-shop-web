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
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
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
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
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
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
