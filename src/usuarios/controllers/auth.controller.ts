import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const { correo_electronico, contrasena } = req.body;
      const usuario = await this.authService.validateUser(correo_electronico, contrasena);
      const resultado = await this.authService.login(usuario);

      res.json(resultado);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}