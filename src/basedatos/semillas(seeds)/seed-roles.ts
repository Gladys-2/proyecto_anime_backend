import { AppDataSource } from "../conexion.module";
import { Rol, RolEnum } from "../../usuarios/entities/rol.entity";

export async function seedRoles() {
  const rolRepo = AppDataSource.getRepository(Rol);

  const roles = [
    { nombre: RolEnum.ADMINISTRADOR },
    { nombre: RolEnum.USUARIO },
  ];

  for (const rolData of roles) {
    const rolExistente = await rolRepo.findOneBy({ nombre: rolData.nombre });

    if (!rolExistente) {
      const rol = rolRepo.create(rolData);
      await rolRepo.save(rol);
    }
  }
}