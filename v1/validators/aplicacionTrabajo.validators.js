import Joi from "joi";

export const createAplicacionTrabajoSchema = Joi.object({
  categoria: Joi.string()
    .hex()
    .length(24)
    .required(),

  empresa: Joi.string()
    .trim()
    .required(),

  puesto: Joi.string()
    .trim()
    .required(),

  estado: Joi.string()
    .valid(
      "pendiente",
      "entrevista",
      "aceptada",
      "rechazada"
    ),

  notas: Joi.string()
    .allow("")
});

export const updateAplicacionTrabajoSchema = Joi.object({
  categoria: Joi.string()
    .hex()
    .length(24),

  empresa: Joi.string()
    .trim(),

  puesto: Joi.string()
    .trim(),

  estado: Joi.string()
    .valid(
      "pendiente",
      "entrevista",
      "aceptada",
      "rechazada"
    ),

  notas: Joi.string()
    .allow("")
}).min(1);