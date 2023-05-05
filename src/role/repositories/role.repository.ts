import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepositoryI } from '../interfaces/role-repository.interface';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RoleRepository implements RoleRepositoryI {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) { }

  async getRoles(): Promise<Role[]> {
    return await this.roleRepository.find({
      relations: {
        users: true,
      },
    });
  }

  async getRole(id: number): Promise<Role> {
    return await this.roleRepository.findOne({
      where: {
        id
      },
    });
  }

  async createRole({ name }: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create({ name });
    return this.roleRepository.save(newRole);
  }

  async updateRole({ id, name }: UpdateRoleDto): Promise<Role> {
    const roleUpdate: Role = await this.roleRepository.preload({
      id, name
    });

    await this.roleRepository.save(roleUpdate)

    return roleUpdate;
  }

  async deleteRole(id: number): Promise<any> {
    return await this.roleRepository.softDelete(id);
  }
}