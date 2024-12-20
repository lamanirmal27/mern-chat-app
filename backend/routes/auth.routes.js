import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", login).post("/logout", logout).post("/signup", signup);

export default router;
