import { IsDate, IsNotEmpty, IsNumber, IsNumberOptions, IsUUID, Matches, Max, MaxLength, MinLength, ValidationOptions } from "class-validator";

interface CustomIsNumberOptions extends IsNumberOptions, ValidationOptions {
  allowDecimal?: boolean;
}

export class CreateOrderDto {
  @IsDate({
    message: 'Ingresar una fecha de entrega válida.'
  })
  @IsNotEmpty({
      message: 'La fecha de entrega es requerida.',
  })
  readonly deadline: Date;

  @IsNotEmpty({
    message: 'El campo precio del servicio es requerido',
  })
  @Max(999999999, {
    message: 'El precio del servicio solo puede contener como máximo 9 dígitos numéricos',
  })
  @IsNumber({ allowDecimal: true } as CustomIsNumberOptions, {
    message: 'El precio del servicio debe ser numérico.',
  })
  readonly order_total: number;

  @IsNotEmpty({
    message: 'El campo estado de la orden es requerido',
  })
  @MinLength(7, {
    message: 'El campo estado de la orden debe contener 7 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo estado de la orden solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo estado de la orden solo puede contener letras' })
  readonly order_status: string;

  @IsNotEmpty({
    message: 'El campo observaciones es requerido',
  })
  @MinLength(7, {
    message: 'El campo observaciones debe contener 7 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo observaciones solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo observaciones solo puede contener letras' })
  readonly observations:string

  @IsNumber({}, {
    message: 'El cliente debe ser numerica.'
  })
  @IsNotEmpty({
    message: 'El cliente es requerida.',
  })
  readonly client: number;

  @IsNotEmpty({
    message: 'El campo usuario es requerido',
  })
  @IsUUID()
  readonly user: string;

  @IsNotEmpty({
    message: 'El proveedor es requerida.',
  })
  @IsNumber({}, {
    each: true,
    message: 'El array debe ser de números.'
  })
  readonly suppliers: Array<number>;
}
