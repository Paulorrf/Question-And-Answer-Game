import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const cancelTokenSource = axios.CancelToken;

export const isCancel = axios.isCancel;
