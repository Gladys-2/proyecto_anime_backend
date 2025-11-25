import { Inventario } from "../entities/inventario.entity";
import { inventarioRepository } from "../repositories/inventario.repository";

export class InventarioService {
  async findAll(): Promise<Inventario[]> {
    return inventarioRepository.find({ relations: ["producto"] });
  }

  async findOne(id: number): Promise<Inventario> {
    const item = await inventarioRepository.findOne({ where: { id }, relations: ["producto"] });
    if (!item) throw new Error("Producto de inventario no encontrado");
    return item;
  }

  async agregarProducto(data: { productoId: number; cantidad: number; precio_unit: number }): Promise<Inventario> {
    const item = inventarioRepository.create({
      producto: { id: data.productoId } as any,
      cantidad: data.cantidad,
      precio_unit: data.precio_unit,
    });
    return inventarioRepository.save(item);
  }

  async actualizarCantidad(id: number, cantidad: number): Promise<Inventario> {
    const item = await this.findOne(id);
    item.cantidad = cantidad;
    return inventarioRepository.save(item);
  }

  async eliminarProducto(id: number): Promise<Inventario> {
    const item = await this.findOne(id);
    await inventarioRepository.remove(item);
    return item;
  }
}