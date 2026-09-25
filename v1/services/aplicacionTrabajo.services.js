import AplicacionTrabajo from "../models/aplicacionTrabajo.model.js";
import Categoria from "../models/categoria.model.js";

export const createAplicacionTrabajoService = async (
  data,
  usuarioId
) => {
  const categoria = await Categoria.findById(data.categoria);

  if (!categoria) {
    const error = new Error("Categoria no encontrada");
    error.status = 404;
    throw error;
  }

  const aplicacion = await AplicacionTrabajo.create({
    ...data,
    usuario: usuarioId
  });

  return aplicacion;
};

export const getAplicacionesTrabajoService = async (usuarioId) => {
  return await AplicacionTrabajo.find({
    usuario: usuarioId
  }).populate("categoria");
};

export const getAplicacionTrabajoByIdService = async (
  id,
  usuarioId 
) => {
  return await AplicacionTrabajo.findOne({
    _id: id,
    usuario: usuarioId
  }).populate("categoria");
};

export const updateAplicacionTrabajoService = async (
  id,
  usuarioId,
  data
) => {
  if (data.categoria) {
    const categoria = await Categoria.findOne({
      _id: data.categoria,
      activo: { $ne: false }
    });

    if (!categoria) {
      const error = new Error("Categoria no encontrada");
      error.status = 404;
      throw error;
    }
  }

  return await AplicacionTrabajo.findOneAndUpdate(
    {
      _id: id,
      usuario: usuarioId
    },
    data,
    {
      new: true,
      runValidators: true
    }
  ).populate("categoria");
};

export const deleteAplicacionTrabajoService = async (
  id,
  usuarioId
) => {
  return await AplicacionTrabajo.findOneAndDelete({
    _id: id,
    usuario: usuarioId
  });
};