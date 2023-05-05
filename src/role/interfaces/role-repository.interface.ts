import { Role } from "../entities/role.entity";


export interface RoleRepositoryI {
  getRoles(): Promise<Role[]>;
  getRole(id: number): Promise<Role>;
}