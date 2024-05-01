import express from "express";
import { addMedication, deleteMedicationRecord, getMedicationRecords, updateMedicationRecord } from "../controllers/medication.js";

const router = express.Router();

router.post("/addMedication", addMedication);
router.post("/getMedicationRecords", getMedicationRecords);
router.patch("/updateMedicationRecord", updateMedicationRecord);
router.delete("/deleteMedicationRecord", deleteMedicationRecord);

export { addMedication, getMedicationRecords, updateMedicationRecord, deleteMedicationRecord };
