import { Categoria } from "../entities/categoria.entity";
import { categoriaRepo } from "../repositories/categoria.repository";

export class CategoriaProductoService {
  private repo = categoriaRepo;

  findAll() {
    return this.repo.find({ relations: ["productos"] });
  }

  async findOne(id: number) {
    const categoria = await this.repo.findOneBy({ id: id as number });
    if (!categoria) throw new Error("Categoría no encontrada");
    return categoria;
  }

  async createCategoria(data: Partial<Categoria>) {
    const categoria = this.repo.create(data);
    return this.repo.save(categoria);
  }

  async updateCategoria(id: number, data: Partial<Categoria>) {
    const categoria = await this.findOne(id);
    Object.assign(categoria, data);
    return this.repo.save(categoria);
  }

  async partialUpdateCategoria(id: number, data: Partial<Categoria>) {
    return this.updateCategoria(id, data);
  }

  async desactivarCategoria(id: number) {
    const categoria = await this.findOne(id);
    categoria.estado = "Inactivo";
    return this.repo.save(categoria);
  }
}