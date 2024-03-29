import axios from "axios";
import { LOGIN_ROUTE, REGISTER_ROUTE, POSTS_ROUTE } from "./routes";
export const api = axios.create({
  baseURL: "https://backend.sharqawi.dev/",
  headers: {
    "Content-Type": "application/json",
  },
});

// for making the browser remembers the user when they refresh the page
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// navigate to login if token is not valid
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const shouldRedirectToLogin = (error.response.status === 401 || error.response.status === 403) && window.location.pathname !== LOGIN_ROUTE && window.location.pathname !== REGISTER_ROUTE;
    if (shouldRedirectToLogin) {
      window.location.href = LOGIN_ROUTE;
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const data = { email, password };
  return (await api.post(LOGIN_ROUTE, data)).data;
};

export const register = async (data) => {
  return (await api.post(REGISTER_ROUTE, data)).data;
}

export const logout = () => {
  localStorage.removeItem("token");
  api.defaults.headers.common["Authorization"] = undefined;
  window.location.href = LOGIN_ROUTE;
};

export const getPosts = async () => {
  return await api.get(POSTS_ROUTE);
};

export const submitPost = async ({ title, content }) => {
  const data = { title, content };
  return await api.post(POSTS_ROUTE, data);
};

export const editPost = async ({ title, content, postId }) => {
  const data = { title, content };
  return (await api.put(`${POSTS_ROUTE}/${postId}`, data)).data;
};

export const deletePost = async (postId) => {
  return (await api.delete(`${POSTS_ROUTE}/${postId}`)).data;
};

export const submitComment = async ({ content, postId }) => {
  const data = { content };
  return api.post(`${POSTS_ROUTE}/${postId}/comments`, data);
};
