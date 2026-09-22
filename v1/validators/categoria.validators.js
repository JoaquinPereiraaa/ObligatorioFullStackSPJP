import Joi from "joi";

export const createCategoriaSchema = Joi.object({
  nombre: Joi.string().required(),
  descripcion: Joi.string().required()
});

