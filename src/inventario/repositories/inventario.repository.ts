import { AppDataSource } from "../../basedatos/conexion.module";
import { Inventario } from "../entities/inventario.entity";

export const inventarioRepository = AppDataSource.getRepository(Inventario);