import express from "express";
import addTag from "../controllers/tags/addTag";
import assignTagToNote from "../controllers/tags/assignTagToNote";
import deleteTag from "../controllers/tags/deleteTag";
import getTags from "../controllers/tags/getTags";
import updateTag from "../controllers/tags/updateTag";
import addTagCheckData from "../middleware/tags/addTag/checkData";
import addTagValidateColor from "../middleware/tags/addTag/validateColor";
import assignTagToNoteCheckTag from "../middleware/tags/assignTagToNote/checkTag";
import checkTagId from "../middleware/tags/checkTagId";
import updateTagValidateColor from "../middleware/tags/updateTag/validateColor";
const router = express.Router();

router.post("/add", addTagCheckData, addTagValidateColor, addTag);

router.post(
  "/assign/:tagId",
  checkTagId,
  assignTagToNoteCheckTag,
  assignTagToNote
);

router.route("/").get(getTags);

router
  .route("/:tagId")
  .patch(checkTagId, updateTagValidateColor, updateTag)
  .delete(checkTagId, deleteTag);

export default router;
