import express from "express";
import addNote from "../controllers/notes/addNote";
import deleteNote from "../controllers/notes/deleteNote";
import getNote from "../controllers/notes/getNote";
import getNotesMeta from "../controllers/notes/getNotesMeta";
import updateNote from "../controllers/notes/updateNote";
import noteGetTitleAndDescription from "../middleware/notes/getTitleAndDescription";
import checkNoteIdParam from "../middleware/notes/checkNoteIdParam";
import updateNoteCheckNewDataProvided from "../middleware/notes/updateNote/checkNewDataProvided";
const router = express.Router();

router.get("/", getNotesMeta);
router.post("/add", noteGetTitleAndDescription, addNote);

router
  .route("/:noteId")
  .get(getNote)
  .patch(
    checkNoteIdParam,
    updateNoteCheckNewDataProvided,
    noteGetTitleAndDescription,
    updateNote
  )
  .delete(checkNoteIdParam, deleteNote);

export default router;
