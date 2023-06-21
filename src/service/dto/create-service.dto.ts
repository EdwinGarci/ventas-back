import { IsNotEmpty, IsNumber, IsNumberOptions, IsString, Length, Matches, Max, MaxLength, MinLength, ValidationOptions } from "class-validator";

interface CustomIsNumberOptions extends IsNumberOptions, ValidationOptions {
  allowDecimal?: boolean;
}

export class CreateServiceDto {
  @IsNotEmpty({
    message: 'El campo nombre es requerido',
  })
  @MinLength(3, {
    message: 'El campo nombre debe contener 3 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo nombre solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo nombre solo puede contener letras' })
  readonly name: string;

  @IsNotEmpty({
    message: 'El campo descripción es requerido',
  })
  @MinLength(3, {
    message: 'El campo descripción debe contener 3 caracteres como mínimo',
  })
  @MaxLength(200, {
    message: 'El campo descripción solo puede contener 200 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo descripción solo puede contener letras' })
  readonly description: string;

  @IsNotEmpty({
    message: 'El campo precio del servicio es requerido',
  })
  @Max(999999999, {
    message: 'El precio del servicio solo puede contener como máximo 9 dígitos numéricos',
  })
  @IsNumber({ allowDecimal: true } as CustomIsNumberOptions, {
    message: 'El precio del servicio debe ser numérico.',
  })
  readonly service_price: number;

  @IsNotEmpty({ 
    message: 'El campo duración estimada es requerido' 
  })
  @IsString({ 
    message: 'La duración estimada debe ser una cadena de texto' 
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'La duración estimada solo puede contener letras y espacios' })
  readonly estimated_duration: string;

  @IsNotEmpty({
    message: 'El campo disponibilidad es requerido',
  })
  @MinLength(3, {
    message: 'El campo disponibilidad debe contener 3 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo disponibilidad solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo disponibilidad solo puede contener letras' })
  readonly availability: string;

  @IsNotEmpty({
    message: 'El campo categoría es requerido',
  })
  @MinLength(3, {
    message: 'El campo categoría debe contener 3 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo categoría solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo categoría solo puede contener letras' })
  readonly category: string;
}
