import express from "express";
import addTag from "../controllers/tags/addTag";
import addTagCheckDataPresense from "../middleware/tags/addTag/checkDataPresense";
import addTagValidateColor from "../middleware/tags/addTag/validateColor";
const router = express.Router();

router.post("/add", addTagCheckDataPresense, addTagValidateColor, addTag);

export default router;
