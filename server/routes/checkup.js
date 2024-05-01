import express from "express";
import { addCheckup, deleteCheckup, getCheckups, updateCheckup } from "../controllers/checkup.js";

const router = express.Router();

router.post("/addCheckup", addCheckup);
router.post("/getCheckups", getCheckups);
router.patch("/updateCheckup", updateCheckup);
router.delete("/deleteCheckup", deleteCheckup);

export { addCheckup, deleteCheckup, getCheckups, updateCheckup };