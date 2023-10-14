import express from "express";
const router = express.Router();
import uploadRouter from "./upload/upload";
import deleteRouter from "./delete/delete";
import viewMediaFileRouter from "./view";

router.use("/upload", uploadRouter);
router.use("/delete", deleteRouter);
router.use("/view", viewMediaFileRouter);

export default router;
