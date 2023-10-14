import express from "express";
const router = express.Router();
import imgDeleteRouter from "./img";

router.use("/img", imgDeleteRouter);

export default router;
