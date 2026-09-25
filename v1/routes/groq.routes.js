import express from "express";
import { generarCartaPresentacion } from "../controllers/groq.controller.js";

const router = express.Router();

router.post("/carta-presentacion", generarCartaPresentacion);

export default router;