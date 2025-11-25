import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./categoria.entity";

export enum EstadoProducto {
  ACTIVO = "Activo",
  INACTIVO = "Inactivo",
}

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: "text", nullable: true })
  descripcion?: string;

  @Column("decimal", { precision: 10, scale: 2 })
  precio!: number;

  @Column({ default: 0 })
  stock!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  fotoUrl?: string;

 @Column({ type: "enum", enum: EstadoProducto, default: EstadoProducto.ACTIVO })
  estado!: EstadoProducto;

  @ManyToOne(() => Categoria, (categoria) => categoria.id)
  categoria!: Categoria;
}