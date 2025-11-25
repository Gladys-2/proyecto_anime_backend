import { IsString, Matches, Length } from "class-validator";

export class CrearUsuarioDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: "Nombre solo letras" })
  nombre: string | undefined;

  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: "Apellido paterno solo letras" })
  apellido_paterno: string | undefined;

  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: "Apellido materno solo letras" })
  apellido_materno: string | undefined;

  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: "Ciudad solo letras" })
  ciudad?: string;

  @Matches(/^\d{8}$/, { message: "Teléfono debe tener 8 números" })
  telefono: string | undefined;
}