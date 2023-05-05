import { Injectable, NotFoundException, HttpException, HttpStatus, BadRequestException, InternalServerErrorException, Inject } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {

  constructor(
    private readonly roleRepository: RoleRepository,
  ) { }

  async getRoles(): Promise<Role[]> {
    const roles = await this.roleRepository.getRoles();

    if (!roles) throw new NotFoundException("Algo salió mal.");

    if (roles && roles.length == 0) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'No hay roles para mostrar.',
    }, HttpStatus.NOT_FOUND)

    return roles;
  }

  async getRole(id: number): Promise<Role> {
    const role_response = await this.roleRepository.getRole(id);

    if (!role_response) throw new NotFoundException("Algo salió mal.");

    if (role_response && role_response == null) throw new HttpException({
      status: HttpStatus.ACCEPTED,
      error: 'El rol no existe.',
    }, HttpStatus.ACCEPTED)

    return role_response;
  }

  async createRole({ name }: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.createRole({ name });
    return newRole;
  }

  async updateRole({ id, name }: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.updateRole({ id, name });

    if (!role) {
      throw new NotFoundException('Rol no encontrado.')
    }

    return role;
  }

  async deleteRole(id: number): Promise<Object> {
    const role = await this.roleRepository.deleteRole(id);
    if (!role || !role.affected) {
      throw new NotFoundException('Rol no encontrado.');
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Rol eliminado exitosamente.',
    }
  }
}
