import mongoose from "mongoose";

const aplicacionTrabajoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },

    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true
    },

    empresa: {
      type: String,
      required: true,
      trim: true
    },

    puesto: {
      type: String,
      required: true,
      trim: true
    },

    estado: {
      type: String,
      enum: [
        "pendiente",
        "entrevista",
        "aceptada",
        "rechazada"
      ],
      default: "pendiente"
    },

    fechaAplicacion: {
      type: Date,
      default: Date.now
    },

    notas: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const AplicacionTrabajo = mongoose.model(
  "AplicacionTrabajo",
  aplicacionTrabajoSchema
);

export default AplicacionTrabajo;