import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
  @IsNumber()
  @IsNotEmpty({
    message: 'El campo id es requerido',
  })
  readonly id: number;
}
