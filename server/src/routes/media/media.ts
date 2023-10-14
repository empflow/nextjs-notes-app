import express from "express";
const router = express.Router();
import uploadRouter from "./upload/upload";
import deleteRouter from "./delete/delete";

router.use("/upload", uploadRouter);
router.use("/delete", deleteRouter);

export default router;
