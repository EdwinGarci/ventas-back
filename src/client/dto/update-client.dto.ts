import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsNumber()
  @IsNotEmpty({
    message: 'El campo rol es requerido',
  })
  readonly id: number;
}

