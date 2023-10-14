import uploadImgCompressImgAndGetPlaceholder from "@/server/src/middleware/media/imgs/upload/compressImgAndGetPlaceholder";
import uploadImgUploadCompressedImg from "@/server/src/middleware/media/imgs/upload/uploadCompressedImg";
import { maxImgSizeInMb } from "@/shared/values";
import express from "express";
const router = express.Router();
import imgUpload from "../../../config/fileUploadMw/imgUpload";
import uploadImgCreateMediaFile from "../../../controllers/media/upload/img";
import checkFileSize from "../../../middleware/media/checkFileSize";

router.post(
  "/",
  imgUpload.single("img"),
  checkFileSize({ multipleFiles: false, maxSizeInMb: maxImgSizeInMb }),
  uploadImgCompressImgAndGetPlaceholder,
  uploadImgUploadCompressedImg,
  uploadImgCreateMediaFile
);

export default router;
