import { Repository } from "typeorm";
import { usuarioRepository } from "../repositories/usuario.repository";
import { Usuario } from "../entities/usuario.entity";
import { EmailService } from "./Email.Service";

export class UsuarioService {
  constructor(
    private usuarioRepo: Repository<Usuario> = usuarioRepository,
    private emailService: EmailService = new EmailService()
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find({ relations: ["roles", "roles.rol"] });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id },
      relations: ["roles", "roles.rol"],
    });
    if (!usuario) throw new Error("Usuario no encontrado");
    return usuario;
  }

  async findByEmail(correo_electronico: string): Promise<Usuario | null> {
    return await this.usuarioRepo.findOneBy({ correo_electronico }) || null;
  }

  async create(data: Partial<Usuario> & { rolesIds?: number[] }): Promise<Usuario> {
    const { rolesIds, ...rest } = data;

    const usuarioExistente = await this.findByEmail(rest.correo_electronico!);
    if (usuarioExistente) throw new Error("el correo ya está registrado exitosamente..");

    const usuario = this.usuarioRepo.create(rest);

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    usuario.verificacionToken = codigo;
    usuario.verificacionExpirada = new Date(Date.now() + 10 * 60 * 1000);

    await this.usuarioRepo.save(usuario);
    try {
      await this.emailService.sendVerificationCode(usuario.correo_electronico, codigo);
    } catch (err) {
      console.error("No se pudo enviar el correo de verificación:", err);
    }

    return this.findOne(usuario.id);
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, data);
    await this.usuarioRepo.save(usuario);
    return this.findOne(id);
  }

  async delete(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    await this.usuarioRepo.remove(usuario);
    return usuario;
  }

  async verifyCode(correo: string, codigo: string): Promise<boolean> {
    const usuario = await this.findByEmail(correo);
    if (!usuario) throw new Error("Usuario no encontrado");

    if (usuario.verificacionToken === codigo && usuario.verificacionExpirada! > new Date()) {
      usuario.verificado = true;
      usuario.verificacionToken = undefined;
      usuario.verificacionExpirada = undefined;
      await this.usuarioRepo.save(usuario);
      return true;
    }
    return false;
  }
}