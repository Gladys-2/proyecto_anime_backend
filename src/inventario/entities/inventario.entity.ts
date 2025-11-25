import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Producto } from "../../productos/entities/producto.entity";

@Entity("inventario")
export class Inventario {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Producto, { onDelete: "CASCADE" })
  producto!: Producto;

  @Column({ type: "int", default: 0 })
  cantidad!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  precio_unit!: number;
}