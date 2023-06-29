import express from "express";
import authorize from "../middleware/authorize";
import authRouter from "./auth";
const router = express.Router();

router.use("/auth", authRouter);

// routes that require authorization
router.use(authorize);

export default router;
