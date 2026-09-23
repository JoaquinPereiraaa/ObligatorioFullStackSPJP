import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    plan: {
      type: String,
      enum: ["plus", "premium"],
      default: "plus"
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;