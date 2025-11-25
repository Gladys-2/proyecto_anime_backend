import { Request, Response, NextFunction } from "express";

export function respuestaInterceptor(req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json.bind(res);

  res.json = (body?: any) => {
    if (body && typeof body === "object" && ("exito" in body || "error" in body)) {
      return originalJson(body);
    }

    const envelope = {
      exito: true,
      mensaje: undefined as string | undefined,
      datos: body ?? null,
    };

    return originalJson(envelope);
  };

  next();
}