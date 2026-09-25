import Usuario from "../models/usuario.model.js";


export const updatePlanService = async (usuarioId) => {
  const usuario = await Usuario.findById(usuarioId);

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  if (usuario.plan !== "plus") {
    const error = new Error(
      "El usuario debe tener plan plus para cambiar a premium"
    );
    error.status = 400;
    throw error;
  }

  usuario.plan = "premium";

  await usuario.save();

  return usuario;
};