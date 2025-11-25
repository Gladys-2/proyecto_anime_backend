import { rolRepository } from "../repositories/rol.repository.js";
import { Rol } from "../entities/rol.entity.js";

export class RolService {
  async findAll(): Promise<Rol[]> {
    return rolRepository.find({ relations: ["usuarios"] });
  }

  async findOne(id: number): Promise<Rol | null> {
    return rolRepository.findOne({ where: { id }, relations: ["usuarios"] });
  }

  async create(data: Partial<Rol>): Promise<Rol> {
    const rol = rolRepository.create(data);
    return rolRepository.save(rol);
  }

  async update(id: number, data: Partial<Rol>): Promise<Rol> {
    const rol = await this.findOne(id);
    if (!rol) throw new Error("rol no encontrado");
    Object.assign(rol, data);
    return rolRepository.save(rol);
  }

  async remove(id: number): Promise<void> {
    const rol = await this.findOne(id);
    if (!rol) throw new Error("rol no encontrado");
    await rolRepository.remove(rol);
  }
}