import api from "../api";
export const uploadFile = async ({ file }: { file: File }) => {
  try {
    const form = new FormData();
    form.append("image", file);
    const response = await api.post({
      url: "/upload-image",
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
