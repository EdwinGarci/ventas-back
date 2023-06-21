import { Module } from '@nestjs/common';
import { ServiceService } from './services/service.service';
import { ServiceController } from './controllers/service.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './repositories/service.repository';

@Module({
  imports: [
    AuthModule,  
    TypeOrmModule.forFeature([Service])], 
  controllers: [ServiceController],
  providers: [
    ServiceService, 
    ServiceRepository
  ]
})
export class ServiceModule {}
