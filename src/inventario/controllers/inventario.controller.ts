import { Request, Response } from "express";
import { InventarioService } from "../services/inventario.service";

export class InventarioController {
  private service: InventarioService;

  constructor(service: InventarioService) {
    this.service = service; 
  }

  findAll = async (req: Request, res: Response) => {
    try {
      const items = await this.service.findAll();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const item = await this.service.findOne(Number(req.params.id));
      res.json(item);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  agregarProducto = async (req: Request, res: Response) => {
    try {
      const item = await this.service.agregarProducto(req.body);
      res.status(201).json(item);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  actualizarCantidad = async (req: Request, res: Response) => {
    try {
      const item = await this.service.actualizarCantidad(Number(req.params.id), req.body.cantidad);
      res.json(item);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  eliminarProducto = async (req: Request, res: Response) => {
    try {
      const item = await this.service.eliminarProducto(Number(req.params.id));
      res.json({ success: true, item });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };
}