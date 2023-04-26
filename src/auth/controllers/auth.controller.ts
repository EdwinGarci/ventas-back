import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from 'src/modules/users/dto';
import { User } from 'src/modules/users/entities/user.entity';
import { Auth, GetUser } from '../decorators';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<Object> {
        return this.authService.login(loginDto);
    }

    @Get('check-status')
    @Auth()
    checkAuthStatus(
        @GetUser() user: User
    ) {
        return this.authService.checkAuthStatus(user);
    }
}
