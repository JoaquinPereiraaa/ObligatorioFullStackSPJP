import {createCategoriaService} from "../services/categoria.services.js";

export const createCategoria = async (req, res, next) => {
  try {
    const categoria = await createCategoriaService(req.body);

    return res.status(201).json(categoria);
  } catch (error) {
    return next(error);
  }
};
