import { DataSource } from "typeorm";
import dotenv from "dotenv";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "POSTGRESQL",
  database: process.env.DB_NAME || "Animes",
  synchronize: true, 
  logging: false,
  entities: [__dirname + "/../**/entities/*.entity.{ts,js}"],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  subscribers: [],
});