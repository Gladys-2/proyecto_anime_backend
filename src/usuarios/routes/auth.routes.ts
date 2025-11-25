import { Router } from "express";
import { AuthService } from "../service/auth.service";

const router = Router();
const service = new AuthService();

router.post("/auth/login", async (req, res) => {
  try {
    const resultado = await service.login(req.body);
    res.json({
      exito: true,
      datos: resultado,
    });
  } catch (error: any) {
    res.status(400).json({
      exito: false,
      mensaje: error.message,
    });
  }
});

router.post("/auth/registro", async (req, res) => {
  try {
    const usuario = await service.register(req.body);
    res.status(201).json({
      exito: true,
      datos: usuario,
    });
  } catch (error: any) {
    res.status(400).json({
      exito: false,
      mensaje: error.message,
    });
  }
});

export { router as authRouter };