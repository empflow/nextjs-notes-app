import cors, { CorsOptions } from "cors";
import getNodeEnv from "@/server/src/utils/getNodeEnv";

const ALLOWED_ORIGINS = ["http://192.168.0.168:3000", "http://localhost:3000"];
const corsOptions: CorsOptions = {
  origin: getNodeEnv() === "dev" ? ALLOWED_ORIGINS : "*",
};

const corsMw = cors(corsOptions);
export default corsMw;
