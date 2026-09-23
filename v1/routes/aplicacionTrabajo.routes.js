import express from "express";

import {
  createAplicacionTrabajo
} from "../controllers/aplicacionTrabajo.controller.js";

import {
  createAplicacionTrabajoSchema
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

export default router;