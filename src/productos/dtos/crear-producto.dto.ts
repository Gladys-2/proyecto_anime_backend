export interface CrearProductoDTO {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoriaId?: number;
}