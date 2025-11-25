import { Router } from "express";
import { InventarioController } from "../controllers/inventario.controller";
import { InventarioService } from "../services/inventario.service";

const router = Router();
const service = new InventarioService();
const controller = new InventarioController(service);

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.post("/", controller.agregarProducto);
router.put("/:id/cantidad", controller.actualizarCantidad);
router.delete("/:id", controller.eliminarProducto);

export { router as inventarioRouter };