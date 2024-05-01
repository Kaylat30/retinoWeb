import express from "express";
import { addAppointment, deleteAppointment, getAppointments,updateAppointment } from "../controllers/appointment.js";

const router = express.Router();

router.post("/addAppointment", addAppointment);
router.post("/getAppointments", getAppointments);
router.patch("/updateAppointment", updateAppointment);
router.delete("/deleteAppointment", deleteAppointment);

export {addAppointment, deleteAppointment, getAppointments,updateAppointment};