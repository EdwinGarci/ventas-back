import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { RoleRepository } from 'src/role/repositories/role.repository';

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleRepository: RoleRepository
  ) { }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        role: true,
      },
    });
  }

  async getUserbyUsername(username: string): Promise<User> {
    console.log(username);
    const user_response = await this.userRepository.findOne({
      where: {
        username
      },
      relations: {
        role: true,
      }
    });
    console.log(user_response);
    return user_response;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, role, ...userData } = createUserDto;
    const frole = await this.roleRepository.getRole(role);

    const newUser = this.userRepository.create({
      ...userData, role: frole, password: bcrypt.hashSync(password, 10)
    });

    return this.userRepository.save(newUser)
  }

  // async updateUser(updateUserDto: UpdateUserDto) {
  //   const { password, id_role, ...userData } = updateUserDto;
  //   const role_user = await this.roleRepository.getRole(id_role);

  //   let userUpdate: User;

  //   if (password != "") {
  //     if (password.length < 6) throw new HttpException({
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       message: 'La contraseña debe contener como mínimo 6 caracteres.',
  //     }, HttpStatus.ACCEPTED)
  //     userUpdate = await this.userRepository.preload({
  //       ...userData, role: role_user, password: bcrypt.hashSync(password, 10)
  //     });
  //   } else {
  //     userUpdate = await this.userRepository.preload({
  //       ...userData, role: role_user
  //     });
  //   }

    

  // }

  

  async deleteUser(uid: string): Promise<void> {
    const deleteResponse = await this.userRepository.softDelete(uid);
    if (!deleteResponse.affected) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }

}