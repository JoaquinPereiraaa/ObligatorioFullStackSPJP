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
  updateAplicacionTrabajoSchema   
} from "../validators/aplicacionTrabajo.validators.js";

import {
  validateBodyMiddleware
} from "../middlewares/validateBody.middleware.js";

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