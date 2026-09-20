import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario._id,
      username: usuario.username,
      role: usuario.role,
      plan: usuario.plan
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export const loginService = async (username, password) => {
  const usuario = await Usuario.findOne({ username });

  if (!usuario) {
    const error = new Error("Usuario o contraseña incorrectos");
    error.status = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(
    password,
    usuario.password
  );

  if (!validPassword) {
    const error = new Error("Usuario o contraseña incorrectos");
    error.status = 401;
    throw error;
  }

  const token = generateToken(usuario);

  return {
    usuario: {
      id: usuario._id,
      username: usuario.username,
      role: usuario.role,
      plan: usuario.plan
    },
    token
  };
};

export const registerService = async (username, password) => {
  const usuarioExistente = await Usuario.findOne({ username });

  if (usuarioExistente) {
    const error = new Error("El nombre de usuario ya está registrado");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.ROUND)
  );

  const usuario = await Usuario.create({
    username,
    password: hashedPassword
  });

  const token = generateToken(usuario);

  return {
    usuario: {
      id: usuario._id,
      username: usuario.username,
      role: usuario.role,
      plan: usuario.plan
    },
    token
  };
};