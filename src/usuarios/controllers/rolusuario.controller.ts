import { Request, Response } from "express";
import { RolUsuarioService } from "../service/RolUsuario.Service";

export class RolUsuarioController {
  constructor(private rolUsuarioService: RolUsuarioService) {}

  async findAll(req: Request, res: Response) {
    try {
      const rolesUsuarios = await this.rolUsuarioService.findAll();
      res.json(rolesUsuarios);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}