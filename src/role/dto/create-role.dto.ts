import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class CreateRoleDto {
  //Validando el campo para nombres
  @IsNotEmpty({
    message: 'El campo nombre es requerido',
  })
  @MinLength(3, {
    message: 'El campo nombre debe contener 3 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo nombre solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'), { message: 'El campo nombre solo puede contener letras' })
  readonly name: string;

  @IsNotEmpty({
    message: 'El campo descripción es requerido',
  })
  @MinLength(3, {
    message: 'El campo descripción debe contener 3 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo descripción solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo descripción tiene un carácter no aceptado' })
  readonly description: string;
}
