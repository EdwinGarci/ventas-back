import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role])
  ],
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository,
  ],
  exports: [RoleRepository]
})
export class RoleModule {}
