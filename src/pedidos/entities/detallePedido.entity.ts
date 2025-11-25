import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Producto } from "../../productos/entities/producto.entity";

@Entity("detalle_pedidos")
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Pedido, pedido => pedido.detalles, { onDelete: "CASCADE" })
  pedido!: Pedido;

  @ManyToOne(() => Producto, { onDelete: "CASCADE" })
  producto!: Producto;

  @Column({ type: "int" })
  cantidad!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio_unit!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  subtotal!: number;

  @BeforeInsert()
  @BeforeUpdate()
  calcularSubtotal() {
    this.subtotal = Number(this.cantidad) * Number(this.precio_unit);
  }
}