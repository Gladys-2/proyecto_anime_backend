import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { RolUsuario } from "./rol.usuario.entity";
import * as bcrypt from "bcryptjs";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "varchar", length: 100 })
  apellido_paterno!: string;

  @Column({ type: "varchar", length: 100 })
  apellido_materno!: string;

  @Column({ type: "varchar", length: 150, unique: true })
  correo_electronico!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  telefono?: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  direccion?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  ciudad?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  departamento?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  pais?: string;

  @Column({ type: "text", select: false })
  contrasena!: string;

  @Column({ default: true })
  activo!: boolean;

  @OneToMany(() => RolUsuario, (rolUsuario) => rolUsuario.usuario)
  roles!: RolUsuario[];

  verificacionToken?: string;
  verificacionExpirada?: Date;
  rol?: any;
  verificado: boolean | undefined;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.contrasena && !this.contrasena.startsWith("$2a$")) {
      this.contrasena = await bcrypt.hash(this.contrasena, 10);
    }
  }
}