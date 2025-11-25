import { rolUsuarioRepository } from "../repositories/RolUsuarioRepository.js";
import { rolRepository } from "../repositories/rol.repository.js";
import { usuarioRepository } from "../repositories/usuario.repository.js"
import { RolUsuario } from "../entities/rol.usuario.entity.js";

export class RolUsuarioService {
  async findAll(): Promise<RolUsuario[]> {
    return rolUsuarioRepository.find({ relations: ["usuario", "rol"] });
  }

  async asignarRol(usuarioId: number, rolId: number): Promise<RolUsuario> {
    const usuario = await usuarioRepository.findOne({ where: { id: usuarioId } });
    const rol = await rolRepository.findOne({ where: { id: rolId } });
    if (!usuario || !rol) throw new Error("usuario o rol no encontrado...noooo");

    const existe = await rolUsuarioRepository.findOne({
      where: { usuario: { id: usuarioId }, rol: { id: rolId } },
    });
    if (existe) throw new Error("el rol ya esta asignado....");

    const rolUsuario = rolUsuarioRepository.create({ usuario, rol });
    return rolUsuarioRepository.save(rolUsuario);
  }

  async quitarRol(usuarioId: number, rolId: number): Promise<RolUsuario> {
    const registro = await rolUsuarioRepository.findOne({
      where: { usuario: { id: usuarioId }, rol: { id: rolId } },
    });
    if (!registro) throw new Error("el rol no esta asignado");

    await rolUsuarioRepository.remove(registro);
    return registro;
  }
}