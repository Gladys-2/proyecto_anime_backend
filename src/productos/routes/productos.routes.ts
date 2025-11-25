import { Router } from "express";
import ProductosController from "../controllers/productos.controller";

const router = Router();
const controller = new ProductosController();

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.patch("/:id", controller.partialUpdate);
router.delete("/:id", controller.desactivar);
router.patch("/:id/categoria/:categoriaId", controller.cambiarCategoria);

export default router;