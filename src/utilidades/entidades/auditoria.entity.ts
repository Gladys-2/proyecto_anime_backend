import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate 
} from "typeorm";

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: "varchar", length: 20, default: "Activo" })
  estado!: "Activo" | "Inactivo";

  @CreateDateColumn({ type: "timestamp", name: "fecha_creacion" })
  fecha_creacion!: Date;

  @Column({ type: "varchar", length: 150, nullable: true, name: "usuario_creacion" })
  usuario_creacion?: string;

  @UpdateDateColumn({ type: "timestamp", name: "fecha_modificacion" })
  fecha_modificacion!: Date;

  @Column({ type: "varchar", length: 150, nullable: true, name: "usuario_modificacion" })
  usuario_modificacion?: string;

  @BeforeInsert()
  ajustarFechaCreacion() {
    this.fecha_creacion = new Date(new Date().getTime() - 4 * 60 * 60 * 1000);
  }

  @BeforeUpdate()
  ajustarFechaModificacion() {
    this.fecha_modificacion = new Date(new Date().getTime() - 4 * 60 * 60 * 1000);
  }
}