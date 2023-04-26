import { CreateUserDto, SearchUserByUDto, UpdateUserDto } from "../dto";
import { Role } from "../entities/role.entity";


export interface RoleRepositoryI {
  getRoles(): Promise<Role[]>;
  getRole(): Promise<Role>;
}