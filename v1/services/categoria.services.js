import Categoria from "../models/categoria.model.js";
import AplicacionTrabajo from "../models/aplicacionTrabajo.model.js";

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

export const categoriaTieneAplicacionesService = async (id) => {
  return await AplicacionTrabajo.exists({ categoria: id });
};

export const deleteCategoriaService = async (id) => {
  return await Categoria.findByIdAndUpdate(
    id,
    { activo: false },
    { new: true }
  );
};