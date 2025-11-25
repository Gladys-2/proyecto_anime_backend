import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DateTime } from "luxon";

import { iniciarConexion } from "./basedatos/conexion.service";
import { ejecutarSemillas } from "./basedatos/semillas(seeds)/controlador-seed";
import { loggerMiddleware } from "./utilidades/middleware/logger.middleware";
import { respuestaInterceptor } from "./utilidades/interceptores/respuesta.interceptor";
import { errorHandler } from "./utilidades/filtros/errores-http.filter";
import { usuariosRouter } from "./usuarios/routes/usuario.routes";
import { authRouter } from "./usuarios/routes/auth.routes";
import productosRouter from "./productos/routes/productos.routes";
import { pedidosRouter } from "./pedidos/routes/pedidos.routes";
import { inventarioRouter } from "./inventario/routes/inventario.routes";

dotenv.config();

async function bootstrap() {
  await iniciarConexion();
  await ejecutarSemillas();

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(loggerMiddleware);

  app.get("/", (req, res) => {
    res.send("Conexión exitosa... ¡Siii!");
  });

  app.get("/ping", (req, res) => {
    const horaBolivia = DateTime.now()
      .setZone("America/La_Paz") 
      .toFormat("dd/MM/yyyy HH:mm:ss");

    res.json({ hora: horaBolivia, mensaje: "Fue un exito la conexion con Bolivia" });
  });

  app.use(respuestaInterceptor);

  app.use("/api/usuarios", usuariosRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/productos", productosRouter);
  app.use("/api/pedidos", pedidosRouter);
  app.use("/api/inventario", inventarioRouter);

  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}

bootstrap();