import dotenv from "dotenv";
dotenv.config();

export const SERVER_CONFIG = {
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
  baseURL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
  env: process.env.NODE_ENV || "development",
};

export const DB_CONFIG = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "POSTGRESQL",
  database: process.env.DB_NAME || "Animes",
};

export const APP_CONFIG = {
  jwtSecret: process.env.JWT_SECRET || "MiClaveSuperSegura123!@",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  emailFrom: process.env.EMAIL_FROM || "gladys@gmail.com",
};