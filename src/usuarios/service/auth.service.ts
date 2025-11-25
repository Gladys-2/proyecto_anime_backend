import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { usuarioRepository } from "../repositories/usuario.repository";
import { RolUsuario } from "../entities/rol.usuario.entity";
import { UsuarioService } from "./usuarios.service";

export class AuthService {
  private usuarioService = new UsuarioService();

  async register(body: any) {
    const nuevoUsuario = await this.usuarioService.create({
      nombre: body.nombre,
      apellido_paterno: body.apellido_paterno,
      apellido_materno: body.apellido_materno,
      correo_electronico: body.correo_electronico,
      contrasena: body.contrasena,
      telefono: body.telefono,
      direccion: body.direccion,
      ciudad: body.ciudad,
      departamento: body.departamento,
      pais: body.pais,
    });

    return { mensaje: "el usuario a sido registrado correctamente", usuario: nuevoUsuario };
  }

  async validateUser(correo_electronico: string, contrasena: string) {
    const usuario = await usuarioRepository.findOne({
      where: { correo_electronico },
      relations: ["roles", "roles.rol"],
    });

    if (!usuario) throw new Error("Correo no encontrado");
    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordMatch) throw new Error("Contraseña incorrecta");

    return usuario;
  }

  async login(body: any) {
    const usuario = await this.validateUser(body.correo_electronico, body.contrasena);
    const roles = usuario.roles?.map((r: RolUsuario) => r.rol.nombre) || [];
    const payload = {
      id: usuario.id,
      correo_electronico: usuario.correo_electronico,
      roles,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "JWT_SECRETO", {
      expiresIn: "1h",
    });

    return {
      token,
      usuario: {
        id: usuario.id,
        correo_electronico: usuario.correo_electronico,
        nombre: usuario.nombre,
        roles,
      },
    };
  }
}