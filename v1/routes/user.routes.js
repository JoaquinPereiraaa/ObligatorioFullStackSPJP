import express from "express";

import {
  updatePlan
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

router.put(
  "/plan",
  roleMiddleware("user", "admin"),
  validateBodyMiddleware(updatePlanSchema),
  updatePlan
);

export default router;