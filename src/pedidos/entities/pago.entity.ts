import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

export enum MetodoPago {
  EFECTIVO = "efectivo",
  TRANSFERENCIA_QR = "transferenciaQR",
}

@Entity("pagos")
export class Pago {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Pedido, pedido => pedido.pagos, { onDelete: "CASCADE" })
  pedido!: Pedido;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  monto!: number;

  @Column({ type: "enum", enum: MetodoPago })
  metodo!: MetodoPago;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}