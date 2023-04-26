import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class SearchUserByUDto {
    //Validando el campo para usuario
    @IsNotEmpty({
        message: 'El campo usuario es requerido',
    })
    @MinLength(6, {
        message: 'El campo usuario debe contener 6 caracteres como mínimo',
    })
    @MaxLength(16, {
        message: 'El campo usuario solo puede contener 16 caracteres como máximo',
    })
    @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ0-9 ]+$'), { message: 'El campo usuario debe contener solo letras y números' })
    readonly username: string;
}
