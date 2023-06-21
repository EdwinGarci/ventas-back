import { IsDate, IsNotEmpty, IsNumber, IsNumberOptions, Matches, Max, MaxLength, MinLength, ValidationOptions } from "class-validator";

interface CustomIsNumberOptions extends IsNumberOptions, ValidationOptions {
  allowDecimal?: boolean;
}

export class CreatePaymentDto {
  @IsDate({
    message: 'Ingresar una fecha de pago válida.'
  })
  @IsNotEmpty({
      message: 'La fecha de pago es requerida.',
  })
  readonly payment_date: Date;// fecha de pago

  @IsNotEmpty({
    message: 'El campo monto de pago es requerido',
  })
  @Max(999999999, {
    message: 'El monto de pago solo puede contener como máximo 9 dígitos numéricos',
  })
  @IsNumber({ allowDecimal: true } as CustomIsNumberOptions, {
    message: 'El monto de pago debe ser numérico.',
  })
  readonly payment_amount: number;// monto del pago

  @IsNotEmpty({
    message: 'El campo forma de pago es requerido',
  })
  @MinLength(7, {
    message: 'El campo forma de pago debe contener 7 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo forma de pago solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo forma de pago solo puede contener letras' })
  readonly way_to_pay: string;//forma de pago

  @IsNotEmpty({
    message: 'El campo estado de pago es requerido',
  })
  @MinLength(7, {
    message: 'El campo estado de pago debe contener 7 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo estado de pago solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo estado de pago solo puede contener letras' })
  readonly payment_status: string;// estado de pago

  @IsNotEmpty({
    message: 'El campo estado conciliación es requerido',
  })
  @MinLength(7, {
    message: 'El campo estado conciliación debe contener 7 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo estado conciliación solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo estado conciliación solo puede contener letras' })
  readonly reconciliation_status: string;// estadoConciliacion

  @IsNumber({}, {
    message: 'La orden debe ser numerica.'
  })
  @IsNotEmpty({
    message: 'La orden es requerida.',
  })
  readonly order: number;
}
