import { Injectable, NotFoundException, HttpException, HttpStatus, BadRequestException, InternalServerErrorException, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { SearchUserByUDto } from '../dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.getUsers();

    if (!users) throw new NotFoundException("Algo salió mal.");

    if (users && users.length == 0) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'No hay usuarios para mostrar.',
    }, HttpStatus.NOT_FOUND)

    return users;
  }

  async getUser(username: string): Promise<User> {
    const searchUserDto: SearchUserByUDto = { username };

    const user_response = await this.userRepository.getUser(searchUserDto);

    if (!user_response) throw new NotFoundException("Algo salió mal.");

    if (user_response && user_response == null) throw new HttpException({
      status: HttpStatus.ACCEPTED,
      error: 'El usuario no existe.',
    }, HttpStatus.ACCEPTED)

    return user_response;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.createUser(createUserDto);

    return newUser.catch((e) => {
      this.handleDBErrors(e)
    });
  }

  // async updateUser(updateUserDto: UpdateUserDto) {
  //   const udpUser = this.userRepository
  // }

  async deleteUser(uid: string): Promise<Object> {
    await this.userRepository.deleteUser(uid);

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Usuario eliminado exitosamente.',
    }
  }



  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }
}
