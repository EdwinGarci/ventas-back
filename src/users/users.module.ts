import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: UserRepository, useClass: UserRepositoryImpl },
  ]
})
export class UsersModule {}
