import Categoria from "../models/categoria.model.js";

export const createCategoriaService = async (data) => {
  const categoria = new Categoria(data);
  return await categoria.save();
};

export const getCategoriasService = async () => {
  return await Categoria.find();
};

export const getCategoriaByIdService = async (id) => {
  return await Categoria.findById(id);
};

export const updateCategoriaService = async (id, data) => {
  return await Categoria.findByIdAndUpdate(id, data, {
    new: true
  });
};