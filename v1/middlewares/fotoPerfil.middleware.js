import multer from "multer";

const tiposPermitidos = new Set([
    "image/jpeg",
    "image/png",
    "image/webp"
]);

export const uploadFotoPerfil = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024
    },
    fileFilter: (_req, file, callback) => {
        if (!tiposPermitidos.has(file.mimetype)) {
            const error = new Error("Solo se permiten imágenes JPG, PNG o WebP");
            error.status = 400;
            return callback(error);
        }

        callback(null, true);
    }
});
