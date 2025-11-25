import { Request, Response } from "express";
import { PedidosService } from "../services/pedidos.service";

export class PedidosController {
  private service = new PedidosService();

  findAll = async (req: Request, res: Response) => {
    try {
      const pedidos = await this.service.findAll();
      res.json(pedidos);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const pedido = await this.service.findOne(Number(req.params.id));
      res.json(pedido);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const pedido = await this.service.createPedido(req.body);
      res.status(201).json(pedido);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  actualizarEstado = async (req: Request, res: Response) => {
    try {
      const pedido = await this.service.actualizarEstadoPedido(Number(req.params.id), req.body.estado);
      res.json(pedido);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  registrarPago = async (req: Request, res: Response) => {
    try {
      const resultado = await this.service.registrarPago(Number(req.params.id), req.body);
      res.json(resultado);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  eliminar = async (req: Request, res: Response) => {
    try {
      const pedido = await this.service.eliminarPedido(Number(req.params.id));
      res.json({ success: true, pedido });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };
}