import getMulterUploadMw from "../../utils/getMulterUploadMw";

const ALLOWED_IMG_EXTS = ["jpeg", "jpg", "png", "webp", "avif", "gif"];
export default getMulterUploadMw(ALLOWED_IMG_EXTS);
