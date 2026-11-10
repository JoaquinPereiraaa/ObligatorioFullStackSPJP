import express from "express";

import {
  updatePlan,
  updateFotoPerfil,
  getUsuarioActual
} from "../controllers/user.controller.js";

import {
  updatePlanSchema
} from "../validators/user.validators.js";

import {
  validateBodyMiddleware
} from "../middlewares/validateBody.middleware.js";

import {
  roleMiddleware
} from "../middlewares/rol.middleware.js";

const router = express.Router();

// Obtener datos del usuario autenticado
router.get("/me", getUsuarioActual);

// Actualizar plan Plus a Premium
router.put(
  "/plan",
  roleMiddleware("user", "admin"),
  validateBodyMiddleware(updatePlanSchema),
  updatePlan
);

// Actualizar foto de perfil con Cloudinary
router.put(
  "/foto-perfil",
  roleMiddleware("user", "admin"),
  updateFotoPerfil
);

export default router;