import axios from "axios";
import baseUrl from "../baseUrl";

const http = axios.create({
  baseURL: baseUrl,
});

http.interceptors.request.use(async (req) => {
  return req;
});

export default http;
