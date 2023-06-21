import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsNumber()
  @IsNotEmpty({
    message: 'El campo rol es requerido',
  })
  readonly id: number;
}
