import { PartialType } from '@nestjs/mapped-types';
import { CrearRolDto } from './crearRol.dto';

export class ActualizarRolDto extends PartialType(CrearRolDto) {}
