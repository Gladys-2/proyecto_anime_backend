import { Request, Response, NextFunction } from "express";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  console.error(error); 
  res.status(error.status || 500).json({
    mensaje: error.message || "Error interno del servidor",
    detalles: error.details || null,
  });
}