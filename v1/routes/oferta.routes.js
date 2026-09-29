import express from "express";
import { buscarOfertas } from "../controllers/oferta.controller.js";

const router = express.Router();

router.get("/", buscarOfertas);

export default router;