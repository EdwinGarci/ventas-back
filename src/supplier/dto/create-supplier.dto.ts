import { IsEmail, IsNotEmpty, IsNumberString, IsPhoneNumber, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateSupplierDto {
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

  //Validando el campo para ruc
  @IsNotEmpty({
    message: 'El campo RUC es requerido',
  })
  @Length(11, 11, {
    message: 'El campo RUC debe tener exactamente 11 caracteres',
  })
  @IsNumberString()
  readonly ruc: string;

  //Validando el campo para apellidos
  @IsNotEmpty({
    message: 'El campo dirección es requerido',
  })
  @MinLength(7, {
    message: 'El campo dirección debe contener 7 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo dirección solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo dirección solo puede contener letras' })
  readonly address: string;

  @IsPhoneNumber()
  @Length(12)
  @Matches(/^(\+51)/)
  readonly phone: string;

  //Validando el campo email
  @IsNotEmpty({
    message: 'El campo email es requerido',
  })
  @IsEmail({}, {
    message: 'El correo ingresado es inválido',
  })
  readonly email: string;
}
