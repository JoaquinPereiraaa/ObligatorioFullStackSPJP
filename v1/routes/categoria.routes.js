import express from "express";

import {
  createCategoria,
  getCategorias,
  getCategoriaById
} from "../controllers/categoria.controller.js";

import { createCategoriaSchema } from "../validators/categoria.validators.js";
import {validateBodyMiddleware} from "../middlewares/validateBody.middleware.js";

const router = express.Router({mergeParams: true});

router.post("/", validateBodyMiddleware(createCategoriaSchema), createCategoria);
router.get("/", getCategorias);
router.get("/:id", getCategoriaById);

export default router;


