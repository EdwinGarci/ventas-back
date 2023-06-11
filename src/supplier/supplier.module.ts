import { Module } from '@nestjs/common';
import { SupplierService } from './services/supplier.service';
import { SupplierController } from './controllers/supplier.controller';
import { Supplier } from './entities/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier])
  ],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    //SupplierRepository

  ]
})
export class SupplierModule {}
