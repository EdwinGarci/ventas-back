import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from 'src/users/dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<Object> {
        const { password, username } = loginDto;
        console.log(loginDto)
        const user_response = await this.userRepository.findOne({
            where: { username },
            relations: { role: true },
            select: { username: true, password: true, uuid: true, name: true, lastname: true, role: { id: true, name: true } } //! OJO!
        });

        if (!user_response)
            throw new BadRequestException(['Las credenciales son incorrectas']);

        if (!bcrypt.compareSync(password, user_response.password))
            throw new BadRequestException(['Las credenciales son incorrectas']);

        const { uuid, name, lastname, role } = user_response;

        return {
            user: { uuid, name, lastname, role },
            token: this.getJwtToken({ uuid: user_response.uuid })
        };
    }

    async checkAuthStatus(user: User) {
        return {
            ...user,
            token: this.getJwtToken({ uuid: user.uuid })
        };
    }

    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
}
