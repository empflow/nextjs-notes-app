import express from "express";
import getNotesMeta from "../controllers/notes/getNotesMeta";
const router = express.Router();

router.use("/", getNotesMeta);

export default router;
