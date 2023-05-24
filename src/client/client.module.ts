import { Module } from '@nestjs/common';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  imports: [
    AuthModule,  
    TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
