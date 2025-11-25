import { Producto } from "../entities/producto.entity";
import { ProductoRepository } from "../repositories/producto.repository";
import { categoriaRepo } from "../repositories/categoria.repository";
import { AppDataSource } from "../../basedatos/conexion.module";

export default class ProductosService {
  private repo = new ProductoRepository(AppDataSource);

  async findAll() {
    return this.repo.find({ relations: ["categoria"] });
  }

  async findOne(id: number) {
    const producto = await this.repo.findOneBy({ id });
    if (!producto) throw new Error("Producto no encontrado");
    return producto;
  }

  async createProducto(data: {
    nombre: string;
    descripcion?: string;
    precio: number;
    stock?: number;
    imagen?: string;
    categoriaId: number;
  }) {
    const categoria = await categoriaRepo.findOneBy({ id: data.categoriaId });
    if (!categoria) throw new Error("Categoría no encontrada");

    const producto = this.repo.create({
      ...data,
      categoria,
      stock: data.stock ?? 0,
      imagen: data.imagen ?? null,
    } as Partial<Producto>);

    return this.repo.save(producto);
  }

  private async aplicarCambios(
    producto: Producto,
    data: Partial<Producto> & { categoriaId?: number }
  ) {
    if (data.categoriaId) {
      const categoria = await categoriaRepo.findOneBy({ id: data.categoriaId });
      if (!categoria) throw new Error("Categoría no encontrada");
      producto.categoria = categoria;
    }

    Object.assign(producto, data);
    return this.repo.save(producto);
  }

  async updateProducto(id: number, data: Partial<Producto> & { categoriaId?: number }) {
    const producto = await this.findOne(id);
    return this.aplicarCambios(producto, data);
  }

  async partialUpdateProducto(id: number, data: Partial<Producto> & { categoriaId?: number }) {
    return this.updateProducto(id, data);
  }

  async desactivarProducto(id: number) {
    const producto = await this.findOne(id);
    producto.estado = "Inactivo";
    return this.repo.save(producto);
  }

  async cambiarCategoriaProducto(productoId: number, categoriaId: number) {
    const producto = await this.findOne(productoId);
    const categoria = await categoriaRepo.findOneBy({ id: categoriaId });
    if (!categoria) throw new Error("Categoría no encontrada");

    producto.categoria = categoria;
    return this.repo.save(producto);
  }
}