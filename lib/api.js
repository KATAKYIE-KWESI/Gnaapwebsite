const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/* ─── TOKEN ───────────────────────── */
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

/* ─── HEADERS ─────────────────────── */
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

/* ─── API WRAPPER ─────────────────── */
export const api = {
  /* GET */
  get: async (endpoint) => {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: authHeaders(),
      });
      return await res.json();
    } catch (err) {
      console.error("GET error:", err);
      return { success: false };
    }
  },

  /* POST */
  post: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  /* PATCH */
  patch: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  /* DELETE */
  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return res.json();
  },
};