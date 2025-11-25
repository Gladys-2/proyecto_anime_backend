import { Repository } from "typeorm";
import { Rol } from "../entities/rol.entity";
import { AppDataSource } from "../../basedatos/conexion.module.js";

export const rolRepository: Repository<Rol> = AppDataSource.getRepository(Rol);