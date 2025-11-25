import { InventarioService } from "./services/inventario.service";
import { InventarioController } from "./controllers/inventario.controller";

export class InventarioModule {
  inventarioService: InventarioService;
  inventarioController: InventarioController;

  constructor() {
    this.inventarioService = new InventarioService();
    this.inventarioController = new InventarioController(this.inventarioService);
  }
}