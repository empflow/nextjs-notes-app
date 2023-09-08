import axios from "axios";
import baseUrl from "../baseUrl";
import fulfilledReqInterceptor from "./fulfilledReqInterceptor";
import rejectedRespInterceptor from "./rejectedRespInterceptor";

const httpWithAuth = axios.create({
  baseURL: baseUrl,
});

httpWithAuth.interceptors.request.use(fulfilledReqInterceptor);
httpWithAuth.interceptors.response.use(null, rejectedRespInterceptor);

export default httpWithAuth;
