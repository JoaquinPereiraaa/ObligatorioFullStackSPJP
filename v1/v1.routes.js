import express from 'express';
import authRouter from './routes/auth.routes.js';
import categoriaRouter from './routes/categoria.routes.js';
import aplicacionTrabajoRouter from "./routes/aplicacionTrabajo.routes.js";
import userRouter from "./routes/user.routes.js";
import { authenticateMiddleware } from './middlewares/authenticate.middleware.js';
import uploadsRoutes from "./routes/uploads.routes.js";
import groqRouter from "./routes/groq.routes.js";
import ofertasRouter from "./routes/oferta.routes.js";


const router = express.Router({mergeParams: true});

//Rutas públicas Login y Registro
router.use('/auth', authRouter);


//middleware para verificacion de token
router.use(authenticateMiddleware);
//Rutas protegidas

router.use('/categorias', categoriaRouter);
router.use("/aplicaciones-trabajo", aplicacionTrabajoRouter);
router.use("/usuarios", userRouter);
router.use("/uploads", uploadsRoutes);
router.use("/ia", groqRouter);
router.use("/ofertas", ofertasRouter);

export default router;