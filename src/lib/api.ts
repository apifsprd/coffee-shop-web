const API_BASE_URL = "https://reqres.in/api";
const PUBLIC_KEY =
  "pub_082806af5be17312fd24c572af33c2320212448c6c05b9fac1fdb64cf139c584";
const MANAGE_KEY = "pro_c25463789a2fc19bbaaed2f4f6825ceb87f9d93092804870";
const PROJECT_ID = 889;
const PROJECT_SLUG = "dibimbing-mini-project-neon-cloud";

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": PUBLIC_KEY,
      },
      body: JSON.stringify({
        email,
        password,
        project_slug: PROJECT_SLUG,
        project_id: PROJECT_ID,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    return response.json();
  },

  async register(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": MANAGE_KEY,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    return response.json();
  },

  async getUser(userId: number, token: string) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": MANAGE_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  },

  async getUsers(page: number, per_page: number, token: string) {
    const response = await fetch(
      `${API_BASE_URL}/users?page=${page}&per_page=${per_page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": MANAGE_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  },
};
