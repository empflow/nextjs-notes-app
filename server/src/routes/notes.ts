import express from "express";
import addNote from "../controllers/notes/addNote";
import getNotesMeta from "../controllers/notes/getNotesMeta";
const router = express.Router();

router.get("/", getNotesMeta);
router.post("/add", addNote);

export default router;
