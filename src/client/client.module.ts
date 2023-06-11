import { Module } from '@nestjs/common';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientRepository } from './repositories/client.repository';

@Module({
  imports: [
    AuthModule,  
    TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    ClientService,
    ClientRepository,
  ]
})
export class ClientModule {}
