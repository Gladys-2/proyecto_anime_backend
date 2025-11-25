import { usuarioRepository } from "./repositories/usuario.repository";
import { rolRepository } from "./repositories/rol.repository.js";
import { rolUsuarioRepository } from "./repositories/RolUsuarioRepository.js";
import { Usuario } from "./entities/usuario.entity.js";
import { RolUsuario } from "./entities/rol.usuario.entity.js";
import { EmailService } from "./service/Email.Service.js";

export class UsuarioService {
  constructor(
    private usuarioRepo = usuarioRepository,
    private rolRepo = rolRepository,
    private rolUsuarioRepo = rolUsuarioRepository,
    private emailService: EmailService
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find({ relations: ["roles", "roles.rol"] });
  }

  async findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { id }, relations: ["roles", "roles.rol"] });
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { correo_electronico: correo } });
  }

  async create(data: any): Promise<Usuario> {
    const { rolesIds, ...rest } = data;
    const usuario = this.usuarioRepo.create(rest) as unknown as Usuario;

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    usuario.verificacionToken = codigo;
    usuario.verificacionExpirada = new Date(Date.now() + 10 * 60 * 1000);

    await this.usuarioRepo.save(usuario);

    if (rolesIds?.length) {
      for (const rolId of rolesIds) {
        await this.asignarRol(usuario.id, rolId);
      }
    }

    await this.emailService.sendVerificationCode(usuario.correo_electronico, codigo);

    const usuarioCreado = await this.findOne(usuario.id);
    if (!usuarioCreado) throw new Error("Error al crear usuario");
    return usuarioCreado;
  }

  async update(id: number, data: any): Promise<Usuario> {
    const usuario = await this.findOne(id);
    if (!usuario) throw new Error("Usuario no encontrado");

    const { rolesAgregarIds, rolesQuitarIds, ...rest } = data;
    Object.assign(usuario, rest);
    await this.usuarioRepo.save(usuario);

    if (rolesAgregarIds?.length) {
      for (const rolId of rolesAgregarIds) {
        await this.asignarRol(usuario.id, rolId);
      }
    }

    if (rolesQuitarIds?.length) {
      for (const rolId of rolesQuitarIds) {
        await this.quitarRol(usuario.id, rolId);
      }
    }

    const usuarioActualizado = await this.findOne(usuario.id);
    if (!usuarioActualizado) throw new Error("Error al actualizar usuario");

    return usuarioActualizado;
  }

  async asignarRol(usuarioId: number, rolId: number): Promise<RolUsuario> {
    const usuario = await this.findOne(usuarioId);
    if (!usuario) throw new Error("Usuario no encontrado");

    const rol = await this.rolRepo.findOne({ where: { id: rolId } });
    if (!rol) throw new Error("Rol no encontrado");

    const existe = await this.rolUsuarioRepo.findOne({
      where: { usuario: { id: usuarioId }, rol: { id: rolId } },
    });
    if (existe) throw new Error("El usuario ya tiene este rol asignado");

    const rolUsuario = this.rolUsuarioRepo.create({ usuario, rol });
    return this.rolUsuarioRepo.save(rolUsuario);
  }

  async quitarRol(usuarioId: number, rolId: number): Promise<RolUsuario> {
    const registro = await this.rolUsuarioRepo.findOne({
      where: { usuario: { id: usuarioId }, rol: { id: rolId } },
    });
    if (!registro) throw new Error("El rol no está asignado al usuario");

    await this.rolUsuarioRepo.remove(registro);
    return registro;
  }
}