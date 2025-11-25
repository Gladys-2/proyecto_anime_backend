import { AppDataSource } from "../../basedatos/conexion.module";
import { Pago } from "../entities/pago.entity";

export const pagoRepository = AppDataSource.getRepository(Pago);