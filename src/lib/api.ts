export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_NAME}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_URL || "",
      },
      body: JSON.stringify({
        email,
        password,
        project_slug: process.env.NEXT_PUBLIC_PROJECT_SLUG,
        project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    return response.json();
  },

  async register(email: string, password: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_NAME}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_MANAGE_KEY || "",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    return response.json();
  },

  async getUser(userId: number) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_NAME}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_MANAGE_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  },

  async getUsers(page: number, per_page: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_NAME}/users?page=${page}&per_page=${per_page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_MANAGE_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  },
};
