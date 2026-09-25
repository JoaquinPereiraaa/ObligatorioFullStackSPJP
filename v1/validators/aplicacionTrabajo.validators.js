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
    
    fechaAplicacion: Joi.date().max("now").messages({
    "date.max": "La fecha de aplicación no puede ser mayor al día actual"
  }),

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

    fechaAplicacion: Joi.date().max("now").messages({
    "date.max": "La fecha de aplicación no puede ser mayor al día actual"
  }),

  notas: Joi.string()
    .allow("")
}).min(1);


export const getAplicacionesByUsuarioSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

    limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .default(10),

    estado: Joi.string()
    .valid(
      "pendiente",
      "entrevista",
      "aceptada",
      "rechazada"
    ),

    categoria: Joi.string()
    .hex()
    .length(24),

    fechaDesde: Joi.date(),

    fechaHasta: Joi.date()
});