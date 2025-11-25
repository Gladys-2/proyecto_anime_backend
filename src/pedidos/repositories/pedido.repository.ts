import { AppDataSource } from "../../basedatos/conexion.service";
import { Pedido } from "../entities/pedido.entity";
export const PedidoRepository = AppDataSource.getRepository(Pedido);