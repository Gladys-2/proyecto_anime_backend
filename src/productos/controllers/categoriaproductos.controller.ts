import { Router, Request, Response } from "express";
import { CategoriaProductoService } from "../services/categoriaproducto.service";

const router = Router();
const service = new CategoriaProductoService();

router.get("/", async (req: Request, res: Response) => {
  try {
    const categorias = await service.findAll();
    res.json(categorias);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const cat = await service.findOne(Number(req.params.id));
    res.json(cat);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const created = await service.createCategoria(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await service.updateCategoria(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await service.partialUpdateCategoria(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const removed = await service.desactivarCategoria(Number(req.params.id));
    res.json({ success: true, categoria: removed });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;