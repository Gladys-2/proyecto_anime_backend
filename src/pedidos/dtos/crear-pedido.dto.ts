export interface CrearPedidoDTO {
  usuarioId: number;
  detalles: CrearDetalleDTO[];
}

export interface CrearDetalleDTO {
  productoId: number;
  cantidad: number;
}
