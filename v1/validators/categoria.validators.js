import Joi from "joi";

export const createCategoriaSchema = Joi.object({
  nombre: Joi.string().required(),
  descripcion: Joi.string().required()
});

export const updateCategoriaSchema = Joi.object({
  nombre: Joi.string(),
  descripcion: Joi.string()
}).min(1);