import { buscarOfertasService } from "../services/ofertas.service.js";

export const buscarOfertas = async (req, res) => {
  try {
    const { keywords, location } = req.query;

    if (!keywords || !location) {
      return res.status(400).json({
        message: "Los parámetros keywords y location son obligatorios"
      });
    }

    const ofertas = await buscarOfertasService(keywords, location);

    return res.status(200).json(ofertas);
  } catch (error) {
    console.error("Error al buscar ofertas en Jooble:", error);

    return res.status(500).json({
      message: "No se pudieron obtener las ofertas laborales"
    });
  }
};