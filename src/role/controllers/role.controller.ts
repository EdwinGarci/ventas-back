import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getRoles(): Promise<Role[]> {
    return this.roleService.getRoles();
  }

  @Get(':id')
  getRole(@Param('id') id): Promise<Role> {
    return this.roleService.getRole(id);
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto);
  }

  @Patch()
  updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleService.updateRole(updateRoleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: number): Promise<Object> {
    return this.roleService.deleteRole(id);
  }
}
