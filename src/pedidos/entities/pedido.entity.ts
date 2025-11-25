import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { DetallePedido } from "./detallePedido.entity";
import { Pago } from "./pago.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";

@Entity("pedidos")
export class Pedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, { nullable: true })
  cliente!: Usuario;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total!: number;

  @Column({ type: "varchar", length: 50, default: "Pendiente" })
  estado!: string;

  @OneToMany(() => DetallePedido, detalle => detalle.pedido, { cascade: true })
  detalles!: DetallePedido[];

  @OneToMany(() => Pago, pago => pago.pedido, { cascade: true })
  pagos!: Pago[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}