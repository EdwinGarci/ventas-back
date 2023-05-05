import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth, GetUser } from '../decorators';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/users/dto';
import { User } from 'src/users/entities/user.entity';

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
