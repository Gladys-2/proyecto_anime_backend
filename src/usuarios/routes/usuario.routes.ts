import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";

const router = Router();
const controller = new UsuariosController();

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.post("/registro", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/verificar", controller.verifyCode); 

export { router as usuariosRouter };       