import express from "express";
const router = express.Router();
import helmet from "helmet";
import morgan from "morgan";

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(helmet());
router.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
router.use(morgan("dev"));

export default router;
