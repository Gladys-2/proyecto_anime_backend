import { Request, Response } from "express";
import ProductosService from "../services/productos.service";

export default class ProductosController {
  constructor(private service = new ProductosService()) {}

  findAll = async (req: Request, res: Response) => {
    try {
      const productos = await this.service.findAll();
      res.json(productos);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const producto = await this.service.findOne(Number(req.params.id));
      res.json(producto);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const producto = await this.service.createProducto(req.body);
      res.status(201).json(producto);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const producto = await this.service.updateProducto(Number(req.params.id), req.body);
      res.json(producto);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  partialUpdate = async (req: Request, res: Response) => {
    try {
      const producto = await this.service.partialUpdateProducto(Number(req.params.id), req.body);
      res.json(producto);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  desactivar = async (req: Request, res: Response) => {
    try {
      const producto = await this.service.desactivarProducto(Number(req.params.id));
      res.json({ success: true, producto });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  cambiarCategoria = async (req: Request, res: Response) => {
    try {
      const productoId = Number(req.params.id);
      const categoriaId = Number(req.params.categoriaId);
      const producto = await this.service.cambiarCategoriaProducto(productoId, categoriaId);
      res.json(producto);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };
}