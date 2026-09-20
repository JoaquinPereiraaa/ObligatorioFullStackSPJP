import express from 'express';
import authRouter from './routes/auth.routes.js';
import { authenticateMiddleware } from './middlewares/authenticate.middleware.js';



 const router = express.Router({mergeParams: true});

//Rutas públicas Login y Registro
router.use('/auth', authRouter);


//middleware para verificacion de token
router.use(authenticateMiddleware);
//Rutas protegidas



 export default router;