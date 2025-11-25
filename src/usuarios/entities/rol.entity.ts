import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RolUsuario } from "./rol.usuario.entity";

export enum RolEnum {
  ADMINISTRADOR = "ADMINISTRADOR",
  USUARIO = "USUARIO",
}

@Entity("roles")
export class Rol {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  nombre!: RolEnum;

  @Column({ default: true })
  activo!: boolean;

  @OneToMany(() => RolUsuario, (rolUsuario) => rolUsuario.rol)
  usuarios!: RolUsuario[];
}

