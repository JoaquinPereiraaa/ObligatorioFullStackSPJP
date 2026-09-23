import {
  createAplicacionTrabajoService
} from "../services/aplicacionTrabajo.services.js";

export const createAplicacionTrabajo = async (
  req,
  res,
  next
) => {
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