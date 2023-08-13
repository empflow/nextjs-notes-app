import express from "express";
import addTag from "../controllers/tags/addTag";
import updateTag from "../controllers/tags/updateTag";
import addTagCheckData from "../middleware/tags/addTag/checkData";
import addTagValidateColor from "../middleware/tags/addTag/validateColor";
import updateTagCheckTagId from "../middleware/tags/updateTag/checkTagId";
import updateTagValidateColor from "../middleware/tags/updateTag/validateColor";
const router = express.Router();

router.post("/add", addTagCheckData, addTagValidateColor, addTag);

router
  .route("/:tagId")
  .patch(updateTagCheckTagId, updateTagValidateColor, updateTag);

export default router;
