import { AppDataSource } from "../conexion.module";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Rol, RolEnum } from "../../usuarios/entities/rol.entity";
import { RolUsuario } from "../../usuarios/entities/rol.usuario.entity";

export async function seedRolUsuario() {
  const usuarioRepo = AppDataSource.getRepository(Usuario);
  const rolRepo = AppDataSource.getRepository(Rol);
  const rolUsuarioRepo = AppDataSource.getRepository(RolUsuario);

  const usuarioAdmin = await usuarioRepo.findOneBy({ correo_electronico: "Administrador@gmail.com" });
  if (!usuarioAdmin) return;

  const rolAdmin = await rolRepo.findOneBy({ nombre: RolEnum.ADMINISTRADOR });
  if (!rolAdmin) return;

  const relacionExistente = await rolUsuarioRepo.findOne({
    where: { usuario: { id: usuarioAdmin.id }, rol: { id: rolAdmin.id } },
  });

  if (relacionExistente) return;

  const nuevaRelacion = rolUsuarioRepo.create({
    usuario: usuarioAdmin,
    rol: rolAdmin,
  });

  await rolUsuarioRepo.save(nuevaRelacion);
}