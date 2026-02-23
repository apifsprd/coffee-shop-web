const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const api = {
  get: ({ url, withToken }: { url: string; withToken?: boolean }) => {
    const headers: Record<string, string> = {};
    if (process.env.NEXT_PUBLIC_API_KEY) {
      headers.apiKey = process.env.NEXT_PUBLIC_API_KEY;
    }
    if (withToken) {
      const token = getToken();
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  },

  post: async ({
    url,
    data,
    withToken,
  }: {
    url: string;
    data: FormData | string | object;
    withToken?: boolean;
  }) => {
    const headers: Record<string, string> = {};

    if (process.env.NEXT_PUBLIC_API_KEY) {
      headers["apiKey"] = process.env.NEXT_PUBLIC_API_KEY;
    }

    if (withToken) {
      headers["authorization"] = `Bearer ${getToken()}`;
    }

    let body: BodyInit;

    if (data instanceof FormData) {
      body = data;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(
      (process.env.NEXT_PUBLIC_API_URL || "") + url,
      {
        method: "POST",
        headers: headers,
        body: body, // Sekarang TypeScript tidak akan protes lagi
      },
    );

    return response.json();
  },

  put: (url: string, data: unknown) =>
    fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  delete: ({
    url,
    data,
    withToken,
  }: {
    url: string;
    data: FormData;
    withToken?: boolean;
  }) =>
    fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: "DELETE",
      headers: process.env.NEXT_PUBLIC_API_KEY
        ? withToken
          ? {
              apiKey: process.env.NEXT_PUBLIC_API_KEY,
              authorization: `Bearer ${getToken()}`,
            }
          : {
              apiKey: process.env.NEXT_PUBLIC_API_KEY,
            }
        : {},
      body: data || null,
    }).then((res) => res.json()),
};

export default api;
