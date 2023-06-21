import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsNumber()
  @IsNotEmpty({
    message: 'El campo es requerido',
  })
  readonly id: number;
}
