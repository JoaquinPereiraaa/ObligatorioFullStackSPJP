import { Router } from "express";
import { subirImagen } from "../controllers/uploads.controller.js";

const router = Router();

router.post("/", subirImagen);

export default router;