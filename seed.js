import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "./v1/config/db.config.js";
import Usuario from "./v1/models/usuario.model.js";

dotenv.config();

const seedUsuarios = async () => {
  try {
    await connectDB();

    // Evita duplicarlos si ejecutamos el seed más de una vez
    await Usuario.deleteMany({
      username: { $in: ["admin", "test"] }
    });

    const adminPassword = await bcrypt.hash(
      "admin123",
      Number(process.env.ROUND)
    );

    const userPassword = await bcrypt.hash(
      "test123",
      Number(process.env.ROUND)
    );

    await Usuario.create([
      {
        username: "admin",
        password: adminPassword,
        role: "admin",
        plan: "plus"
      },
      {
        username: "test",
        password: userPassword,
        role: "user",
        plan: "plus"
      }
    ]);

    console.log("Usuarios precargados correctamente");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error al precargar usuarios:", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedUsuarios();