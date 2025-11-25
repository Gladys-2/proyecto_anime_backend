import { AppDataSource } from "../conexion.module";
import { Pedido } from "../../pedidos/entities/pedido.entity";
import { DetallePedido } from "../../pedidos/entities/detallePedido.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Producto } from "../../productos/entities/producto.entity";

export async function seedPedidos() {
  const pedidoRepo = AppDataSource.getRepository(Pedido);
  const detalleRepo = AppDataSource.getRepository(DetallePedido);
  const usuarioRepo = AppDataSource.getRepository(Usuario);
  const productoRepo = AppDataSource.getRepository(Producto);

  const usuario = await usuarioRepo.findOneBy({ id: 1 as number });
  const producto = await productoRepo.findOneBy({ id: 1 as number });
  if (!usuario || !producto) return;

  const detalle = detalleRepo.create({
    producto,
    cantidad: 1,
    precio_unit: producto.precio,
    subtotal: producto.precio,
  });

  await detalleRepo.save(detalle);

  const pedido = pedidoRepo.create({
    cliente: usuario,
    total: detalle.subtotal,
    detalles: [detalle],
  });

  await pedidoRepo.save(pedido);
}