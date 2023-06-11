import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from '../entities/supplier.entity';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';

@Injectable()
export class SupplierRepository {
  constructor(
    @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>,
  ) { }

  async getSuppliers(): Promise<Supplier[]> {
    return await this.supplierRepository.find({
      select: {
        id: true, name: true, ruc: true, address: true, phone: true, email: true, createdAt: true,
      },
      relations: {
        // user: true,
      },
      order: {
        name: 'desc',
      },
      withDeleted: true
    });
  }

  async getSupplier(id: number): Promise<Supplier> {
    return await this.supplierRepository.findOne({
      where: { id },
      select: {
        id: true, name: true, ruc: true, address: true, phone: true, email: true, createdAt: true,
      },
      relations: {
        // user: true,
      },
      order: {
        name: 'desc',
      },
      withDeleted: true
    });
  }

  async createSupplier(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const { ...supplierData } = createSupplierDto
    const newSupplier = this.supplierRepository.create({
      ...supplierData
    });

    return await this.supplierRepository.save(newSupplier)
  }

  async updateSupplier({ id, name, ruc, address, email, phone }: UpdateSupplierDto): Promise<Supplier> {
    const supplierUpdate: Supplier = await this.supplierRepository.preload({
      id, name, ruc, address, email, phone
    });

    await this.supplierRepository.save(supplierUpdate)

    return supplierUpdate;
  }

  async deleteSupplier(id: number): Promise<any> {
    return await this.supplierRepository.softDelete(id);
  }

}