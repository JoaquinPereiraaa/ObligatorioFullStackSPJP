import express from "express";

import {
  createAplicacionTrabajo,
  getAplicacionesTrabajo,
  getAplicacionTrabajoById,
  updateAplicacionTrabajo,
  deleteAplicacionTrabajo
} from "../controllers/aplicacionTrabajo.controller.js";

import {
  createAplicacionTrabajoSchema,
  updateAplicacionTrabajoSchema,
  getAplicacionesByUsuarioSchema
} from "../validators/aplicacionTrabajo.validators.js";

import {
  validateBodyMiddleware
} from "../middlewares/validateBody.middleware.js";

import { validateQueryMiddleware } from "../middlewares/validateQuery.middleware.js";

const router = express.Router({
  mergeParams: true
});

router.post(
  "/",
  validateBodyMiddleware(createAplicacionTrabajoSchema),
  createAplicacionTrabajo
);

router.get(
  "/",
  validateQueryMiddleware(getAplicacionesByUsuarioSchema),
  getAplicacionesTrabajo
);

router.get(
  "/:id",
  getAplicacionTrabajoById
);

router.put(
  "/:id",
  validateBodyMiddleware(updateAplicacionTrabajoSchema),
  updateAplicacionTrabajo
);

router.delete(
  "/:id",
  deleteAplicacionTrabajo
);

export default router;