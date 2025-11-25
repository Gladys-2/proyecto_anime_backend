import { AppDataSource } from "../../basedatos/conexion.module";
import { DetallePedido } from "../entities/detallePedido.entity";

export const detalleRepository = AppDataSource.getRepository(DetallePedido);