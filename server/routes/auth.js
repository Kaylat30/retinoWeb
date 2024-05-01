import express from "express";
import {logout, register,login} from "../controllers/auth.js"

const router = express.Router()
router.post("/login",login)
router.post("/signup",register)
router.post("/logout",logout)

export {register,logout,login}