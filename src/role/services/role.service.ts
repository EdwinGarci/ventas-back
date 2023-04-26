import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService {

  constructor(
    private readonly roleRepository: RoleRepository,
  ) { }

  getRoles() {
    return `This action returns all role`;
  }

  getRole(id: number) {
    return `This action returns a #${id} role`;
  }

  createRole(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  deleteRole(id: number) {
    return `This action removes a #${id} role`;
  }
}
