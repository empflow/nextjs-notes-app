import express from "express";
import authorize from "../middleware/authorize";
import authRouter from "./auth";
import notesRouter from "./notes";
const router = express.Router();

router.use("/auth", authRouter);

// routes that require authorization
router.use("/notes", authorize, notesRouter);

export default router;
