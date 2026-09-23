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