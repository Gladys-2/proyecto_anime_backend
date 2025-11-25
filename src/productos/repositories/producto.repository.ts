import { Repository, DataSource } from "typeorm";
import { Producto } from "../entities/producto.entity";

export class ProductoRepository extends Repository<Producto> {
  constructor(dataSource: DataSource) {
    super(Producto, dataSource.manager);
  }
}

// Crear instancia para usar directamente
import { AppDataSource } from "../../basedatos/conexion.module";
export const productoRepo = new ProductoRepository(AppDataSource);