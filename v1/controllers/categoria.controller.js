import {
  createCategoriaService,
  getCategoriasService,
  getCategoriaByIdService,
  updateCategoriaService,
  categoriaTieneAplicacionesService,
  deleteCategoriaService
} from "../services/categoria.services.js";
import mongoose from "mongoose";

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

export const getCategoriaById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    message: "ID de categoria invalido"
      });
    }


    const categoria = await getCategoriaByIdService(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        message: "Categoria no encontrada"
      });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    return next(error);
  }
};

export const updateCategoria = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "ID de categoria invalido"
      });
    }

    const categoria = await updateCategoriaService(
      req.params.id,
      req.body
    );

    if (!categoria) {
      return res.status(404).json({
        message: "Categoria no encontrada"
      });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    return next(error);
  }
};

export const deleteCategoria = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "ID de categoria invalido"
      });
    }

    const categoria = await getCategoriaByIdService(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        message: "Categoria no encontrada"
      });
    }

    const tieneAplicaciones =
      await categoriaTieneAplicacionesService(req.params.id);

    if (tieneAplicaciones) {
      return res.status(409).json({
        message: "No se puede eliminar una categoria con aplicaciones asociadas"
      });
    }

    const categoriaEliminada =
      await deleteCategoriaService(req.params.id);

    return res.status(200).json(categoriaEliminada);
  } catch (error) {
    return next(error);
  }
};