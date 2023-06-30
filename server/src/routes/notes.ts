import express from "express";
import addNote from "../controllers/notes/addNote";
import getNote from "../controllers/notes/getNote";
import getNotesMeta from "../controllers/notes/getNotesMeta";
import validateAddNote from "../middleware/notes/validateAddNote";
const router = express.Router();

router.get("/", getNotesMeta);
router.post("/add", validateAddNote, addNote);

router.route("/:noteId").get(getNote);

export default router;
