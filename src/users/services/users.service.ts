import { Injectable, NotFoundException, HttpException, HttpStatus, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

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

  async getUser({username}: any): Promise<User> {
    const user_response = await this.userRepository.getUserbyUsername( username );

    if (!user_response) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'El usuario no existe.',
    }, HttpStatus.NOT_FOUND)

    return user_response;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.createUser(createUserDto);

    return newUser.catch((e) => {
      this.handleDBErrors(e)
    });
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.updateUser(updateUserDto);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    try {
      const updatedUser = await this.userRepository.getUserbyUid(user.uuid);
      if (!updatedUser) {
        throw new NotFoundException('Usuario no encontrado.');
      }
      return updatedUser;
    } catch (error) {
      const errors = [];
      if (/(value_identification)[\s\S]+(already exists)/.test(error.detail)) errors.push('La identificación ingresada ya pertenece a un usuario.')

      if (/(username)[\s\S]+(already exists)/.test(error.detail)) errors.push('El usuario ingresado ya pertenece a un registro.')

      if (errors.length > 0) throw new BadRequestException(errors);

      throw error;
    }
  }

  async deleteUser(uid: string): Promise<Object> {
    const existUser = await this.userRepository.getUserbyUid(uid);

    if (!existUser) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Usuario no encontrado.',
      };
    }
  
    await this.userRepository.deleteUser(uid);
  
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Usuario eliminado exitosamente.',
    };
  }



  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }
}
