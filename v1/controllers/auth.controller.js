import {
  loginService,
  registerService
} from "../services/auth.services.js";

export const ingresarUsuario = async (req, res) => {
  const { username, password } = req.validatedBody;

  const result = await loginService(
    username,
    password
  );

  res.status(200).json({
    message: "Inicio de sesión exitoso",
    ...result
  });
};

export const registrarUsuario = async (req, res) => {
  const { username, password } = req.validatedBody;

  const result = await registerService(
    username,
    password
  );

  res.status(201).json({
    message: "Usuario registrado correctamente",
    ...result
  });
};