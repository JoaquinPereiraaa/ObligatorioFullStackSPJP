import AplicacionTrabajo from "../models/aplicacionTrabajo.model.js";
import Categoria from "../models/categoria.model.js";
import Usuario from "../models/usuario.model.js";

export const createAplicacionTrabajoService = async (
  data,
  usuarioId
) => {
  const usuario = await Usuario.findById(usuarioId);

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  if (usuario.plan === "plus") {
    const cantidadAplicaciones =
      await AplicacionTrabajo.countDocuments({
        usuario: usuarioId
      });

    if (cantidadAplicaciones >= 4) {
      const error = new Error(
        "El plan plus permite un máximo de 4 aplicaciones de trabajo"
      );
      error.status = 403;
      throw error;
    }
  }

  const categoria = await Categoria.findOne({
    _id: data.categoria,
    activo: { $ne: false }
  });

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

export const getAplicacionesTrabajoService = async (usuarioId, filtros) => {
  const{page, limit, estado, categoria, fechaDesde, fechaHasta} = filtros;

  const query = { usuario: usuarioId };

  if (estado) {
    query.estado = estado;
  }

  if (categoria) {
    query.categoria = categoria;
  }

  if (fechaDesde || fechaHasta) {
  query.fechaAplicacion = {};

  if (fechaDesde) {
    query.fechaAplicacion.$gte = new Date(fechaDesde);
  }

  if (fechaHasta) {
    const hasta = new Date(fechaHasta);

    hasta.setHours(23, 59, 59, 999);

    query.fechaAplicacion.$lte = hasta;
  }
}

  const skip = (page - 1) * limit;
  const aplicaciones = await AplicacionTrabajo.find(query)
  .populate("categoria")
  .sort({ fechaAplicacion: -1 })
  .skip(skip)
  .limit(limit);

  const total = await AplicacionTrabajo.countDocuments(query);

  return {aplicaciones, paginacion: {page, limit, total, totalPages: Math.ceil(total / limit)}};
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