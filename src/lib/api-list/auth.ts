import api from "../api";

export const login = async (payload: { email: string; password: string }) => {
  try {
    const form = new FormData();
    form.append("email", payload.email);
    form.append("password", payload.password);
    const response = await api.post({ url: "/login", data: form });
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  role: string;
}) => {
  try {
    const form = new FormData();
    form.append("name", payload.name);
    form.append("email", payload.email);
    form.append("password", payload.password);
    form.append("passwordRepeat", payload.passwordRepeat);
    form.append("role", payload.role);
    const response = await api.post({ url: "/register", data: form });
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};

export const getUserData = async () => {
  try {
    const response = await api.get({
      url: "/user",
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
