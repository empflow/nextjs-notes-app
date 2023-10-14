import express from "express";
import authorize from "../middleware/authorize";
import authRouter from "./auth";
import notesRouter from "./notes";
import tagsRouter from "./tags";
import mediaRouter from "./media/media";
const router = express.Router();

router.use("/auth", authRouter);

// routes that require authorization
router.use("/notes", authorize, notesRouter);
router.use("/tags", authorize, tagsRouter);
router.use("/media", authorize, mediaRouter);

export default router;
