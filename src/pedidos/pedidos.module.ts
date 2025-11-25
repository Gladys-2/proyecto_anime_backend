import { Module } from "@nestjs/common";
import { PedidosService } from "./services/pedidos.service";
import { PedidosController } from "./controllers/pedidos.controller";

@Module({
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}