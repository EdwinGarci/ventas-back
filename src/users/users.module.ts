import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserExistsRule } from './dto/custom-validations/user-name-exists.validate';
import { TypeUserExistsRule } from './dto/custom-validations/validate-type-user-id';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './repositories/user.repository';
import { RoleRepository } from 'src/role/repositories/role.repository';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    AuthModule, 
    RoleModule, 
    TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UserExistsRule,
    TypeUserExistsRule,
    RoleRepository,
  ]
})
export class UsersModule {}
