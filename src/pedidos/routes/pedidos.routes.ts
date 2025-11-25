import { Router } from "express";
import { PedidosController } from "../controllers/pedidos.controller";

const router = Router();
const controller = new PedidosController();

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.post("/", controller.create);
router.put("/:id/estado", controller.actualizarEstado);
router.post("/:id/pago", controller.registrarPago);
router.delete("/:id", controller.eliminar);

export { router as pedidosRouter };