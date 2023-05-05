import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNumber()
  @IsNotEmpty({
    message: 'El campo rol es requerido',
  })
  readonly id: number;
}
