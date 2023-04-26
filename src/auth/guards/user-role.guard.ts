import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "src/modules/users/entities/user.entity";
import { META_ROLES } from "../decorators/role-protected.decorator";

@Injectable()
export class UserRoleGuard implements CanActivate {
    
    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {

        const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())

        if (!validRoles) return true;
        if (validRoles.length === 0) return true;

        const req = context.switchToHttp().getRequest();
        const user = req.user as User;

        if (!user)
            throw new BadRequestException(['Usuario no encontrado']);

        if (validRoles.includes(user.role.name)) {
            return true;
        }

        throw new ForbiddenException(
            [`Este usuario no cuenta con el permiso necesario`]
        );
    }
}