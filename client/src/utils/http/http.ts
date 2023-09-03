import axios from "axios";
import baseUrl from "./baseUrl";
import sharedInterceptorFunctionality from "./sharedInterceptorFunctionality";

const http = axios.create({
  baseURL: baseUrl,
});

http.interceptors.request.use(async (req) => {
  sharedInterceptorFunctionality(req);
  return req;
});

export default http;
