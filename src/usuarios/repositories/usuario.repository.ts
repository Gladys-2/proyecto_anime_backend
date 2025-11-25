import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { AppDataSource } from "../../basedatos/conexion.service";

export const usuarioRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario);