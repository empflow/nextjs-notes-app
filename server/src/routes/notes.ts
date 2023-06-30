import express from "express";
import addNote from "../controllers/notes/addNote";
import getNotesMeta from "../controllers/notes/getNotesMeta";
import validateAddNote from "../middleware/notes/validateAddNote";
const router = express.Router();

router.get("/", getNotesMeta);
router.post("/add", validateAddNote, addNote);

export default router;
