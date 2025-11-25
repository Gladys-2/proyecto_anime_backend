import { PartialType } from '@nestjs/mapped-types';
import { CrearUsuarioDto } from "./crear-usuario.dto"
import { IsArray, IsOptional } from 'class-validator';

export class ActualizarUsuarioDto extends PartialType(CrearUsuarioDto) {
  @IsArray()
  @IsOptional()
  rolesAgregarIds?: number[];

  @IsArray()
  @IsOptional()
  rolesQuitarIds?: number[];
}