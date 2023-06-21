import { Module } from '@nestjs/common';
import { SupplierService } from './services/supplier.service';
import { SupplierController } from './controllers/supplier.controller';
import { Supplier } from './entities/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierRepository } from './repositories/supplier.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule, 
    TypeOrmModule.forFeature([Supplier]),
  ],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    SupplierRepository,
  ]
})
export class SupplierModule {}
