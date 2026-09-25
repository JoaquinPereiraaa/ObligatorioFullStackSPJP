import {
  createAplicacionTrabajoService,
  getAplicacionesTrabajoService,
  getAplicacionTrabajoByIdService,
  updateAplicacionTrabajoService,
  deleteAplicacionTrabajoService
} from "../services/aplicacionTrabajo.services.js";

import mongoose from "mongoose";

export const createAplicacionTrabajo = async (req, res, next) => {
  try {
    const aplicacion =
      await createAplicacionTrabajoService(
        req.body,
        req.user.id
      );

    return res.status(201).json(aplicacion);
  } catch (error) {
    return next(error);
  }
};

export const getAplicacionesTrabajo = async (req, res,next) => {
  try {
    const aplicaciones =
      await getAplicacionesTrabajoService(req.user.id, req.validatedQuery);

    return res.status(200).json(aplicaciones);
  } catch (error) {
    return next(error);
  }
};

export const getAplicacionTrabajoById = async (
  req,
  res,
  next
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "ID de aplicacion de trabajo invalido"
      });
    }

    const aplicacion =
      await getAplicacionTrabajoByIdService(
        req.params.id,
        req.user.id
      );

    if (!aplicacion) {
      return res.status(404).json({
        message: "Aplicacion de trabajo no encontrada"
      });
    }

    return res.status(200).json(aplicacion);
  } catch (error) {
    return next(error);
  }
};

export const updateAplicacionTrabajo = async (
  req,
  res,
  next
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "ID de aplicacion de trabajo invalido"
      });
    }

    const aplicacion =
      await updateAplicacionTrabajoService(
        req.params.id,
        req.user.id,
        req.body
      );

    if (!aplicacion) {
      return res.status(404).json({
        message: "Aplicacion de trabajo no encontrada"
      });
    }

    return res.status(200).json(aplicacion);
  } catch (error) {
    return next(error);
  }
};

export const deleteAplicacionTrabajo = async (
  req,
  res,
  next
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "ID de aplicacion de trabajo invalido"
      });
    }

    const aplicacion =
      await deleteAplicacionTrabajoService(
        req.params.id,
        req.user.id
      );

    if (!aplicacion) {
      return res.status(404).json({
        message: "Aplicacion de trabajo no encontrada"
      });
    }

    return res.status(200).json({
      message: "Aplicacion de trabajo eliminada correctamente"
    });
  } catch (error) {
    return next(error);
  }
};