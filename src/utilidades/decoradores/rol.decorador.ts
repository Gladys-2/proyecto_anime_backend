import { Request, Response, NextFunction } from "express";

export function requerirRol(rolEsperado: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const usuario = (req as any).usuario;
    if (!usuario) {
      return res.status(401).json({ exito: false, error: { mensaje: "No autenticado" } });
    }

    const rolesUsuario = Array.isArray(usuario.rol) ? usuario.rol : [usuario.rol];

    if (!rolesUsuario.includes(rolEsperado)) {
      return res.status(403).json({ exito: false, error: { mensaje: "Acceso prohibido" } });
    }

    next();
  };
}
