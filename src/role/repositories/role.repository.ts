import { Injectable, NotFoundException, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepositoryI } from '../interfaces/role-repository.interface';

@Injectable()
export class RoleRepository implements RoleRepositoryI {
  constructor(
    // @InjectRepository(User) private readonly userRepository: Repository<User>,
    // @InjectRepository(User) private readonly roleRepository: Repository<Role>,
  ) { }

  // async getUsers(): Promise<User[]> {
  //   return await this.userRepository.find({
  //     relations: {
  //       role: true,
  //     },
  //   });
  // }

  // async getUser({ username }: SearchUserByUDto): Promise<User> {
  //   return await this.userRepository.findOne({
  //     where: {
  //       username: username
  //     },
  //   });
  // }

  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const { password, role, ...userData } = createUserDto;
  //   const frole = await this.roleRepository.findOne({
  //     where: {
  //       id: role
  //     },
  //   });

  //   const newUser = this.userRepository.create({
  //     ...userData, role: frole, password: bcrypt.hashSync(password, 10)
  //   });

  //   return this.userRepository.save(newUser);
  // }

  // async updateUser(updateUserDto: UpdateUserDto) {
  //   const { password, id_role, ...userData } = updateUserDto;
  //   const role_user = await this.roleRepository.findOne({
  //     where: {
  //       id: id_role
  //     },
  //   });

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

  //   if (!userUpdate) {
  //     throw new NotFoundException('Usuario no encontrado.')
  //   }

  //   await this.userRepository.save(userUpdate).catch((e) => {
  //     const errors = [];
  //     if (/(value_identification)[\s\S]+(already exists)/.test(e.detail)) errors.push('La identificación ingresada ya pertenece a un usuario.')

  //     if (/(username)[\s\S]+(already exists)/.test(e.detail)) errors.push('El usuario ingresado ya pertenece a un registro.')

  //     if (errors.length > 0) throw new BadRequestException(errors);

  //     return e;
  //   });

  //   return await this.userRepository.findOne({
  //     where: {
  //       uuid: userUpdate.uuid
  //     },
  //     relations: {
  //       role: true,
  //     },
  //   });
  // }

  // async deleteUser(uid: string): Promise<void> {
  //   const deleteResponse = await this.userRepository.softDelete(uid);
  //   if (!deleteResponse.affected) {
  //     throw new NotFoundException('Usuario no encontrado.');
  //   }
  // }

}