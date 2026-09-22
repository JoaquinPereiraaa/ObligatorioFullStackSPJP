import Categoria from "../models/categoria.model.js";

export const createCategoriaService = async (data) => {
  const categoria = new Categoria(data);
  return await categoria.save();
};

export const getCategoriasService = async () => {
  return await Categoria.find();
};