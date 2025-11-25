import { DataSource, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";
import { AppDataSource } from "../../basedatos/conexion.module";

export class CategoriaRepository extends Repository<Categoria> {
  findAll: any;
  constructor(dataSource: DataSource) {
    super(Categoria, dataSource.createEntityManager());
  }
}
export const categoriaRepo = new CategoriaRepository(AppDataSource);