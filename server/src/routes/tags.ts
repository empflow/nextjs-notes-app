import express from "express";
import addTag from "../controllers/tags/addTag";
import deleteTag from "../controllers/tags/deleteTag";
import updateTag from "../controllers/tags/updateTag";
import addTagCheckData from "../middleware/tags/addTag/checkData";
import addTagValidateColor from "../middleware/tags/addTag/validateColor";
import updateTagCheckTagId from "../middleware/tags/updateTag/checkTagId";
import checkTagId from "../middleware/tags/checkTagId";
import updateTagValidateColor from "../middleware/tags/updateTag/validateColor";
const router = express.Router();

router.post("/add", addTagCheckData, addTagValidateColor, addTag);

router
  .route("/:tagId")
  .patch(updateTagCheckTagId, updateTagValidateColor, updateTag)
  .delete(deleteTag);
  .patch(checkTagId, updateTagValidateColor, updateTag)

export default router;
