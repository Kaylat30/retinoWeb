import express from "express";
import { addEyeScreening, deleteEyeScreening, getEyeScreenings, updateEyeScreening } from "../controllers/eyescreening.js";

const router = express.Router();

router.post("/addEyeScreening", addEyeScreening);
router.post("/getEyeScreenings", getEyeScreenings);
router.patch("/updateEyeScreening", updateEyeScreening);
router.delete("/deleteEyeScreening", deleteEyeScreening);

export { addEyeScreening, deleteEyeScreening, getEyeScreenings, updateEyeScreening };