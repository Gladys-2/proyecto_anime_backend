import { Request, Response } from "express";
import { RolService } from "../service/Rol.service";

export class RolController {
  constructor(private rolService: RolService) {}

  async findAll(req: Request, res: Response) {
    try {
      const roles = await this.rolService.findAll();
      res.json(roles);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const rol = await this.rolService.findOne(id);
      res.json(rol);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const nuevoRol = await this.rolService.create(data);
      res.status(201).json(nuevoRol);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const rolActualizado = await this.rolService.update(id, data);
      res.json(rolActualizado);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
