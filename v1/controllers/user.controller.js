import {
  updatePlanService
} from "../services/user.services.js";

export const updatePlan = async (
  req,
  res,
  next
) => {
  try {
    const usuario = await updatePlanService(
      req.user.id
    );

    return res.status(200).json({
      message: "Plan actualizado correctamente",
      usuario: {
        id: usuario._id,
        username: usuario.username,
        role: usuario.role,
        plan: usuario.plan
      }
    });
  } catch (error) {
    return next(error);
  }
};