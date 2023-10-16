import { ALLOWED_IMG_EXTS } from "@/shared/values";
import getMulterUploadMw from "../../utils/getMulterUploadMw";

export default getMulterUploadMw(ALLOWED_IMG_EXTS);
