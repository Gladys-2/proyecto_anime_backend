import { AppDataSource } from "../conexion.module";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { RolEnum } from "../../usuarios/entities/rol.entity";
import * as bcrypt from "bcryptjs";

export const usuariosIniciales = [
  {
    nombre: "Administrador",
    apellido_paterno: "Principal",
    apellido_materno: "",
    correo_electronico: "admin@peluches.com",
    contrasena: "admin123",
    rol: RolEnum.ADMINISTRADOR,
    fecha: new Date(),
  },
  {
    nombre: "UsuarioPrueba",
    apellido_paterno: "Test",
    apellido_materno: "",
    correo_electronico: "usuario@peluches.com",
    contrasena: "usuario123",
    rol: RolEnum.USUARIO,
    fecha: new Date(),
  },
];

export async function seedUsuarios() {
  const usuarioRepo = AppDataSource.getRepository(Usuario);

  for (const u of usuariosIniciales) {
    const existe = await usuarioRepo.findOneBy({ correo_electronico: u.correo_electronico });
    if (!existe) {
      const usuario = usuarioRepo.create({
        ...u,
        contrasena: await bcrypt.hash(u.contrasena, 10),
      });
      await usuarioRepo.save(usuario);
    }
  }
}