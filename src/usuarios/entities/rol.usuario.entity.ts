import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, Column } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Rol } from "./rol.entity";

@Entity("roles_usuarios")
@Unique(["usuario", "rol"])
export class RolUsuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.roles, { onDelete: "CASCADE" })
  usuario!: Usuario;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, { onDelete: "CASCADE" })
  rol!: Rol;

  @Column({ default: true })
  activo!: boolean;
}