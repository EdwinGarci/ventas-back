import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @Auth(ValidRoles.Administrador)
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('getuser')
  // @Auth(ValidRoles.Administrador)
  getUserbyUsername(@Body() username: string): Promise<User> {
    return this.usersService.getUser(username);
  }

  @Post()
  // @Auth(ValidRoles.Administrador)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Patch()
  // @Auth(ValidRoles.Administrador)
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete(':uuid')
  // @Auth(ValidRoles.Administrador)
  deleteUser(@Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, })) uid: string): Promise<Object> {
    return this.usersService.deleteUser(uid);
  }

}
