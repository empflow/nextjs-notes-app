import express from "express";
import viewMediaFile from "../../controllers/media/view";
import checkParamObjectId from "../../middleware/checkParamObjectId";
import viewMediaFileCheckIsAllowed from "../../middleware/media/view/checkIsAllowed";
import viewMediaFileGenerateSignedUrl from "../../middleware/media/view/generateSignedUrl";
const router = express.Router();

const paramName = "mediaFileId";
router.get(
  `/:${paramName}`,
  checkParamObjectId(paramName),
  viewMediaFileCheckIsAllowed,
  viewMediaFileGenerateSignedUrl,
  viewMediaFile
);

export default router;
