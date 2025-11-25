import { Repository } from "typeorm";
import { RolUsuario } from "../entities/rol.usuario.entity";
import { AppDataSource } from "../../basedatos/conexion.module.js";

export const rolUsuarioRepository: Repository<RolUsuario> = AppDataSource.getRepository(RolUsuario);