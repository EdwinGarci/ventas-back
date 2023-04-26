import { Injectable, NotFoundException, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SearchUserByUDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepositoryI } from 'src/role/interfaces/role-repository.interface';

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleRepository: RoleRepositoryI
  ) { }

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

  async deleteUser(uid: string): Promise<void> {
    const deleteResponse = await this.userRepository.softDelete(uid);
    if (!deleteResponse.affected) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }

}