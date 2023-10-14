import express from "express";
const router = express.Router();
import imgUploadRouter from "./img";

router.use("/img", imgUploadRouter);

export default router;
