import axios from "axios";
import { API_ROOT_URL, Constants } from "../config/config";

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [API_ROOT_URL];
    const accessToken = localStorage.getItem(Constants.accessTokenKey);
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function isStoredAccessToken(): boolean {
  return Boolean(localStorage.getItem(Constants.accessTokenKey));
}

export function url(path: string) {
  return API_ROOT_URL + path;
}

export const get = axios.get;
export const patch = axios.patch;
export const post = axios.post;
export const delet = axios.delete;
