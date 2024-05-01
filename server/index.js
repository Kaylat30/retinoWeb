import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import path from "path"
import dotenv from "dotenv";
import { register,logout,login } from "./routes/auth.js"
import {addBlogs,getBlogs,deleteBlog,updateBlog,getBlogInfo} from "./routes/blog.js"
import { addCheckup, deleteCheckup, getCheckups, updateCheckup } from "./routes/checkup.js";
import { addEyeScreening, deleteEyeScreening, getEyeScreenings, updateEyeScreening } from "./routes/eyescreening.js";
import { addAppointment, deleteAppointment, getAppointments, updateAppointment } from "./routes/appointment.js";
import { addMedication, getMedicationRecords, updateMedicationRecord, deleteMedicationRecord } from "./routes/medication.js";
import { addNutrition,getNutritionRecords,updateNutritionRecord,deleteNutritionRecord } from "./routes/nutrition.js";

import flash from "express-flash";
import passport from "passport";
import cookieParser from "cookie-parser";
import { initializePassport } from "./middleware/passport.js";
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';


//const url = 'https://retino.vercel.app'
// Configurations
const  app = express()
app.use(express.json())
app.use(cors({
    // origin: url,
    methods: ['GET','POST','PATCH','DELETE','PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}))
dotenv.config(); // Load environment variables from .env file

//MIDDLEWARE 
//AUTHENTICATION    

initializePassport(passport)   

const sessionStore = new (MongoDBStore(session))({
    uri: process.env.MONGO_URL, // MongoDB connection URL
    collection: 'sessions', // Collection to store sessions in
    autoRemove: 'interval', // Automatically remove expired sessions
    autoRemoveInterval: 1, // Interval in minutes for session cleanup
}); 

app.set('trust proxy', 1)
app.use(flash()) 
app.use(session({
    secret: process.env.JWT_SECRET,
    name: 'sessionId',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie:{
        maxAge: 600000, 
        //httpOnly: true,
        secure:true,   
        // sameSite: 'none'  
    }
}))
app.use(cookieParser(process.env.JWT_SECRET));
app.use(passport.initialize())
app.use(passport.session())    



// MONGOOSE SETUP
const PORT = process.env.PORT || 5000
mongoose
    .connect(process.env.MONGO_URL).then(()=>{
        app.listen(PORT, "localhost", ()=> console.log(`Server Port: ${PORT}`))
    }).catch((error)=> console.log(`${error} did not connect`))
    

// ROUTES
// Auth Routes
app.use("/login", login);
app.use("/signup", register);
app.use("/logout", logout);

// Blog Routes
app.use("/addBlog", addBlogs);
app.use("/getBlogs", getBlogs);
app.use("/getBlog/:id", getBlogInfo);
app.use("/deleteBlog", deleteBlog);
app.use("/updateBlog", updateBlog);

// Checkup Routes
app.use("/addCheckup", addCheckup);
app.use("/getCheckups", getCheckups);
app.use("/deleteCheckup", deleteCheckup);
app.use("/updateCheckup", updateCheckup);

// Eye Screening Routes
app.use("/addEyeScreening", addEyeScreening);
app.use("/getEyeScreenings", getEyeScreenings);
app.use("/deleteEyeScreening", deleteEyeScreening);
app.use("/updateEyeScreening", updateEyeScreening);

// Appointment Routes
app.use("/addAppointment", addAppointment);
app.use("/getAppointments", getAppointments);
app.use("/deleteAppointment", deleteAppointment);
app.use("/updateAppointment", updateAppointment);

// Medication Routes
app.use("/addMedication", addMedication);
app.use("/getMedications", getMedicationRecords);
app.use("/deleteMedication", deleteMedicationRecord);
app.use("/updateMedication", updateMedicationRecord);

// Nutrition Routes
app.use("/addNutrition", addNutrition);
app.use("/getNutritions", getNutritionRecords);
app.use("/deleteNutrition", deleteNutritionRecord);
app.use("/updateNutrition", updateNutritionRecord);

