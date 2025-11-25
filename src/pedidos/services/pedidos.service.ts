import { Pedido } from "../entities/pedido.entity";
import { DetallePedido } from "../entities/detallePedido.entity";
import { Pago, MetodoPago } from "../entities/pago.entity";
import { PedidoRepository } from "../repositories/pedido.repository";
import { detalleRepository } from "../repositories/detalle.repository";
import { pagoRepository } from "../repositories/pago.repository";

export class PedidosService {
  async findAll(): Promise<Pedido[]> {
    return PedidoRepository.find({ relations: ["detalles", "detalles.producto", "pagos", "cliente"] });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await PedidoRepository.findOne({
      where: { id },
      relations: ["detalles", "detalles.producto", "pagos", "cliente"],
    });
    if (!pedido) throw new Error("el pedido no fue encontrado");
    return pedido;
  }

  async createPedido(data: { clienteId: number; detalles: { productoId: number; cantidad: number; precio_unit: number }[]; total: number }): Promise<Pedido> {
    const pedido = PedidoRepository.create({
      total: data.total,
      estado: "Pendiente",
      cliente: { id: data.clienteId } as any,
    });

    const pedidoGuardado = await PedidoRepository.save(pedido);

    for (const det of data.detalles) {
      const detalle = detalleRepository.create({
        pedido: pedidoGuardado as any,
        producto: { id: det.productoId } as any,
        cantidad: det.cantidad,
        precio_unit: det.precio_unit,
        subtotal: det.cantidad * det.precio_unit,
      });
      await detalleRepository.save(detalle);
    }

    return this.findOne(pedidoGuardado.id);
  }

  async actualizarEstadoPedido(id: number, estado: string): Promise<Pedido> {
    const pedido = await this.findOne(id);
    pedido.estado = estado;
    return PedidoRepository.save(pedido);
  }

  async registrarPago(id: number, data: { monto: number; metodo: MetodoPago }): Promise<{ pedido: Pedido; pago: Pago }> {
    const pedido = await this.findOne(id);

    const pago = pagoRepository.create({
      monto: data.monto,
      metodo: data.metodo,
      pedido: pedido,
    });

    await pagoRepository.save(pago);

    pedido.estado = "Pagado";
    await PedidoRepository.save(pedido);

    return { pedido, pago };
  }

  async eliminarPedido(id: number): Promise<Pedido> {
    const pedido = await this.findOne(id);
    await PedidoRepository.remove(pedido);
    return pedido;
  }
}