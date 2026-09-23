import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  }
});

const Categoria = mongoose.model("Categoria", categoriaSchema);

export default Categoria;