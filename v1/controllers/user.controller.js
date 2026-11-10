import multer from "multer";


import {
  updatePlanService,
  updateFotoPerfilService,
  getUsuarioActualService
} from "../services/user.services.js";

import { uploadFotoPerfil } from "../middlewares/fotoPerfil.middleware.js";
import { runMulterSingle } from "../utils/multer.util.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.util.js";
import cloudinary from "../config/cloudinary.js";

const serializarUsuario = (usuario) => ({
  id: usuario._id,
  username: usuario.username,
  role: usuario.role,
  plan: usuario.plan,
  fotoPerfil: usuario.fotoPerfil || ""
});

export const updatePlan = async (req, res, next) => {
  try {
    const usuario = await updatePlanService(req.user.id);

    return res.status(200).json({
      message: "Plan actualizado correctamente",
      usuario: serializarUsuario(usuario)
    });
  } catch (error) {
    return next(error);
  }
};

export const updateFotoPerfil = async (req, res, next) => {
  try {
    await runMulterSingle(uploadFotoPerfil, "imagen", req, res);

    if (!req.file) {
      return res.status(400).json({
        message: "Seleccioná una imagen para tu foto de perfil"
      });
    }

    const resultado = await uploadBufferToCloudinary(
      cloudinary,
      req.file.buffer,
      {
        resource_type: "image",
        folder: "postula/fotos-perfil"
      }
    );

    if (!resultado.secure_url) {
      throw new Error("Cloudinary no devolvió una URL segura");
    }

    const usuario = await updateFotoPerfilService(
      req.user.id,
      resultado.secure_url
    );

    return res.status(200).json({
      message: "Foto de perfil actualizada correctamente",
      usuario: serializarUsuario(usuario)
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      const esArchivoGrande = error.code === "LIMIT_FILE_SIZE";
      return res.status(esArchivoGrande ? 413 : 400).json({
        message: esArchivoGrande
          ? "La imagen no puede superar los 3 MB"
          : "No se pudo procesar la imagen"
      });
    }

    return next(error);
  }
};

export const getUsuarioActual = async (req, res, next) => {
  try {
    const usuario = await getUsuarioActualService(req.user.id);

    return res.status(200).json({
      usuario
    });
  } catch (error) {
    return next(error);
  }
};