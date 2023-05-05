import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, SearchUserByUDto, UpdateUserDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { RoleRepository } from 'src/role/repositories/role.repository';

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleRepository: RoleRepository
  ) { }

  async preloadU(user: User): Promise<User> {
    return await this.userRepository.preload(user);
  }

  async saveU(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        role: true,
      },
    });
  }

  async getUser({ username }: SearchUserByUDto): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username: username
      },
    });
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

  //   // Validación de datos de entrada
  //   if (password !== "" && password.length < 6) {
  //     throw new BadRequestException({
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       message: 'La contraseña debe contener como mínimo 6 caracteres.',
  //     });
  //   }

  //   const role_user = await this.roleRepository.getRole(id_role);

  //   let userUpdate: User;

  //   if (password !== "") {
  //     userUpdate = await this.userRepository.preload({
  //       ...userData,
  //       role: role_user,
  //       password: bcrypt.hashSync(password, 10),
  //     });
  //   } else {
  //     userUpdate = await this.userRepository.preload({
  //       ...userData,
  //       role: role_user,
  //     });
  //   }

  //   if (!userUpdate) {
  //     throw new NotFoundException('Usuario no encontrado.');
  //   }

  //   // Actualización del usuario
  //   try {
  //     await this.userRepository.save(userUpdate);
  //   } catch (e) {
  //     const errors = [];

  //     if (/(value_identification)[\s\S]+(already exists)/.test(e.detail)) {
  //       errors.push('La identificación ingresada ya pertenece a un usuario.');
  //     }

  //     if (/(username)[\s\S]+(already exists)/.test(e.detail)) {
  //       errors.push('El usuario ingresado ya pertenece a un registro.');
  //     }

  //     if (errors.length > 0) {
  //       throw new BadRequestException(errors);
  //     }

  //     return e;
  //   }

  //   return await this.userRepository.findOne({
  //     where: { uuid: userUpdate.uuid },
  //     relations: {
  //       role: true,
  //     },
  //   });
  // }

  async deleteUser(uid: string): Promise<void> {
    const deleteResponse = await this.userRepository.softDelete(uid);
    if (!deleteResponse.affected) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }

}