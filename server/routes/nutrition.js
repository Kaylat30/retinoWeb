import express from "express";
import { addNutrition,getNutritionRecords,updateNutritionRecord,deleteNutritionRecord } from "../controllers/nutrition.js";

const router = express.Router();

router.post("/addNutrition", addNutrition);
router.post("/getNutritions", getNutritionRecords);
router.patch("/updateNutrition", updateNutritionRecord);
router.delete("/deleteNutrition", deleteNutritionRecord);

export { addNutrition,getNutritionRecords,updateNutritionRecord,deleteNutritionRecord };