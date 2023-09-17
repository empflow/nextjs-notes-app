import express from "express";
import addNote from "../controllers/notes/addNote";
import deleteNote from "../controllers/notes/deleteNote";
import getNote from "../controllers/notes/getNote";
import getNotesMeta from "../controllers/notes/getNotesMeta";
import updateNote from "../controllers/notes/updateNote";
import validateAddNote from "../middleware/notes/validateAddNote";
import validateDeleteNote from "../middleware/notes/validateDeleteNote";
import validateGetNote from "../middleware/notes/validateGetNote";
import noteGetTitleAndDescription from "../middleware/notes/getTitleAndDescription";
import updateNoteCheckNoteId from "../middleware/notes/updateNote/checkNoteId";
import updateNoteCheckNewDataProvided from "../middleware/notes/updateNote/checkNewDataProvided";
const router = express.Router();

router.get("/", getNotesMeta);
router.post("/add", validateAddNote, noteGetTitleAndDescription, addNote);

router
  .route("/:noteId")
  .get(validateGetNote, getNote)
  .patch(
    updateNoteCheckNoteId,
    updateNoteCheckNewDataProvided,
    noteGetTitleAndDescription,
    updateNote
  )
  .delete(validateDeleteNote, deleteNote);

export default router;
