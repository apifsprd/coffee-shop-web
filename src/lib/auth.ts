export function checkToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      auth: false,
    };
  }

  return {
    auth: true,
  };
}
