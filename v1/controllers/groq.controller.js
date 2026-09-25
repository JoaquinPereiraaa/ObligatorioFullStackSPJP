import { generarCartaPresentacionService } from "../services/groq.service.js";

export const generarCartaPresentacion = async (req, res) => {
    try {
        const { oferta, perfil } = req.body;

        if (!oferta || !perfil) {
            return res.status(400).json({
                message: "La oferta laboral y el perfil del candidato son obligatorios"
            });
        }

        const carta = await generarCartaPresentacionService(oferta, perfil);

        return res.status(200).json({
            carta
        });

    } catch (error) {
        console.error("Error al generar carta con Groq:", error);

        return res.status(500).json({
            message: "No se pudo generar la carta de presentacion"
        });
    }
};