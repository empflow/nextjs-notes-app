import express from "express";
import addNote from "../controllers/notes/addNote";
import deleteNote from "../controllers/notes/deleteNote";
import getNote from "../controllers/notes/getNote";
import getNotesMeta from "../controllers/notes/getNotesMeta";
import updateNote from "../controllers/notes/updateNote";
import validateAddNote from "../middleware/notes/validateAddNote";
import validateGetNote from "../middleware/notes/validateGetNote";
import validateUpdateNote from "../middleware/notes/validateUpdateNote";
const router = express.Router();

router.get("/", getNotesMeta);
router.post("/add", validateAddNote, addNote);

router
  .route("/:noteId")
  .get(validateGetNote, getNote)
  .patch(validateUpdateNote, updateNote)
  .delete(deleteNote);

export default router;
