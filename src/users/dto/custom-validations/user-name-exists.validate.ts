import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async validate(value: string) {
        try {
            await this.userRepository.findOneOrFail({ where: { username: value }, withDeleted: true });
            return false;
        } catch (e) {
            return true;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return 'El usuario ingresado ya existe';
    }
}

export function UserExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'UserExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UserExistsRule,
        });
    };
}


