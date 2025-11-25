import { AppDataSource } from './conexion.module';

export async function iniciarConexion() {
  try {
    await AppDataSource.initialize();
    console.log("Se conecto a la base de datos con exito");
  } catch (error) {
    console.error("No se conecto a la base de datos vuelve a intentarlo", error);
    process.exit(1);
  }
}

export { AppDataSource };
