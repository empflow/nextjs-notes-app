import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!apiBaseUrl) throw new Error(`api base url not provided`);

axios.defaults.baseURL = apiBaseUrl;

export default axios;
