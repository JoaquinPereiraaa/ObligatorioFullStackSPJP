import {
  createCategoriaService,
  getCategoriasService
} from "../services/categoria.services.js";

export const createCategoria = async (req, res, next) => {
  try {
    const categoria = await createCategoriaService(req.body);

    return res.status(201).json(categoria);
  } catch (error) {
    return next(error);
  }
};

export const getCategorias = async (req, res, next) => {
  try {
    const categorias = await getCategoriasService();

    return res.status(200).json(categorias);
  } catch (error) {
    return next(error);
  }
};