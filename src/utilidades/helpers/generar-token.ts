import jwt, { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "MiClaveSuperSegura123!";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface PayloadToken {
  sub: number | string;
  correo?: string;
  rol?: string;
  [key: string]: any;
}

export function generarToken(
  payload: PayloadToken,
  expiresIn: string | number = JWT_EXPIRES_IN
): string {
  const options: SignOptions = { expiresIn: expiresIn as SignOptions["expiresIn"] };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verificarToken(token: string): PayloadToken {
  return jwt.verify(token, JWT_SECRET) as PayloadToken;
}