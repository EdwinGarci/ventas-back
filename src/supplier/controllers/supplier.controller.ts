import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierService } from '../services/supplier.service';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { Supplier } from '../entities/supplier.entity';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  // @Auth(ValidRoles.Administrador)
  getSuppliers(): Promise<Supplier[]> {
    return this.supplierService.getSuppliers();
  }

  @Get(':id')
  // @Auth(ValidRoles.Administrador)
  getSupplier(@Param('id') id,): Promise<Supplier> {
    return this.supplierService.getSupplier(id);
  }

  @Post()
  createSupplier(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  @Patch()
  updateSupplier(@Body() updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    return this.supplierService.updateSupplier(updateSupplierDto);
  }

  @Delete(':id')
  deleteSupplier(@Param('id') id: number): Promise<Object> {
    return this.supplierService.deleteSupplier(id);
  }
}
