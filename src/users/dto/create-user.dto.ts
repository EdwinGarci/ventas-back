import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, Matches, MaxLength, MinLength } from "class-validator";
import { UserExists, TypeUserExists, IdentificationExists  } from "./custom-validations/index"

export class CreateUserDto {
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

  //Validando el campo para apellidos
  @IsNotEmpty({
    message: 'El campo usuario es requerido',
  })
  @MinLength(7, {
    message: 'El campo apellidos debe contener 7 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo apellidos solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'), { message: 'El campo apellidos solo puede contener letras' })
  readonly lastname: string;

  //Validando el campo DNI
  @MinLength(8, {
    message: 'La identificación debe contener 8 caracteres como minimo',
  })
  @IsNumberString({}, {
    message: 'La identificación es inválida.'
  })
  @IdentificationExists(true)
  @IsNotEmpty({
    message: 'La identificación es requerida',
  })
  readonly dni: string;

  //Validando el campo para usuario
  @UserExists()
  @IsNotEmpty({
    message: 'El campo nombre de usuario es requerido',
  })
  @MinLength(6, {
    message: 'El campo nombre de usuario debe contener 6 caracteres como mínimo',
  })
  @MaxLength(16, {
    message: 'El campo nombre de usuario solo puede contener 16 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ0-9 ]+$'), { message: 'El campo nombre de usuario debe contener solo letras y números' })
  readonly username: string;

  //Validando el campo email
  @IsNotEmpty({
    message: 'El campo email es requerido',
  })
  @IsEmail({}, {
    message: 'El correo ingresado es inválido',
  })
  readonly email: string;

  //Validando el campo tipo de usuario
  @IsNumber()
  @IsNotEmpty({
    message: 'El rol es requerido',
  })
  @TypeUserExists()
  readonly role: number;

  //Validando el campo contraseña
  @IsNotEmpty({
    message: 'El campo contraseña es requerido',
  })
  @MinLength(6, {
    message: 'La contraseña debe contener 6 caracteres como mínimo',
  })
  @MaxLength(20, {
    message: 'La contraseña solo puede contener 20 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ0-9 ]+$'), { message: 'La contraseña solo puede contener solo letras y números.' })
  readonly password: string;
}
