import api from "../api";

export const login = async (payload: { email: string; password: string }) => {
  try {
    const form = new FormData();
    form.append("email", payload.email);
    form.append("password", payload.password);
    const response = await api.post("/api/v1/login", form);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
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
    const response = await api.post("/api/v1/register", form);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getUserData = async () => {
  try {
    const response = await api.get({
      url: "/api/v1/user",
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
