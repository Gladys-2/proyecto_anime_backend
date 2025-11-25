import { Request, Response } from "express";
import { UsuarioService } from "../service/usuarios.service";

export class UsuariosController {
  private service = new UsuarioService();

  findAll = async (req: Request, res: Response) => {
    try {
      const usuarios = await this.service.findAll();
      res.json(usuarios);
    } catch (err: any) {
      res.status(500).json({ mensaje: "Error al cargar los usuarios", error: err.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const usuario = await this.service.findOne(Number(req.params.id));
      res.json(usuario);
    } catch (err: any) {
      res.status(404).json({ mensaje: "Usuario no encontrado", error: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const nuevoUsuario = await this.service.create(req.body);
      res.status(201).json({ mensaje: "Usuario creado, revisa tu correo para el código de verificación", usuario: nuevoUsuario });
    } catch (err: any) {
      res.status(400).json({ mensaje: "No se pudo registrar el usuario", error: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const usuario = await this.service.update(Number(req.params.id), req.body);
      res.json({ mensaje: "Usuario actualizado correctamente", usuario });
    } catch (err: any) {
      res.status(400).json({ mensaje: "Error al actualizar usuario", error: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const usuario = await this.service.delete(Number(req.params.id));
      res.json({ mensaje: "Usuario eliminado con éxito", usuario });
    } catch (err: any) {
      res.status(400).json({ mensaje: "Error al  querer eliminar usuario", error: err.message });
    }
  };

  verifyCode = async (req: Request, res: Response) => {
    try {
      const { correo_electronico, codigo } = req.body;
      const valido = await this.service.verifyCode(correo_electronico, codigo);
      if (valido) return res.json({ mensaje: "Cuenta verificada correctamente" });
      return res.status(400).json({ mensaje: "Código inválido o expirado" });
    } catch (err: any) {
      res.status(400).json({ mensaje: "Error al verificar código", error: err.message });
    }
  };
}