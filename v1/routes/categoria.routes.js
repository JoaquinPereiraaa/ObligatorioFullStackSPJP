import express from "express";

import {
  createCategoria,
  getCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria
} from "../controllers/categoria.controller.js";

import {
  createCategoriaSchema,
  updateCategoriaSchema
} from "../validators/categoria.validators.js";

import { roleMiddleware } from "../middlewares/rol.middleware.js";
import {validateBodyMiddleware} from "../middlewares/validateBody.middleware.js";

const router = express.Router({mergeParams: true});

router.post("/", roleMiddleware("admin"), validateBodyMiddleware(createCategoriaSchema), createCategoria);
router.put("/:id", roleMiddleware("admin"), validateBodyMiddleware(updateCategoriaSchema), updateCategoria);
router.get("/", getCategorias);
router.get("/:id", getCategoriaById);
router.delete("/:id", roleMiddleware("admin"), deleteCategoria);

export default router;


