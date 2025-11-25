import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ahora = new Date();
  const horaLocal = ahora.toLocaleString("es-BO"); // formato Bolivia
  console.info(`[${horaLocal}] Usuario hizo ${req.method} en ruta ${req.originalUrl} desde IP ${req.ip}`);
  next();
};