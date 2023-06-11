import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { SupplierRepository } from '../repositories/supplier.repository';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
export class SupplierService {

  constructor(
    private readonly supplierRepository: SupplierRepository,
  ){ }

  async getSuppliers(): Promise<Supplier[]> {
    //Consulta
    const suppliers: Supplier[] = await this.supplierRepository.getSuppliers();

    //Mensaje para cuando salga mal la consulta
    if (!suppliers) throw new NotFoundException("Algo salió mal.");

    //Mensaje para cuando no se encuentren registros
    if (suppliers && suppliers.length == 0) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'No hay proveedores para mostrar.',
    }, HttpStatus.NOT_FOUND)

    return suppliers;
  }

  async getSupplier(id: number): Promise<Supplier> {
    //Consulta
    const msupplier = await this.supplierRepository.getSupplier(id);

    //Mensaje para cuando salga mal la consulta
    if (!msupplier) throw new NotFoundException("El proveedor no existe.");

    return msupplier;
  }

  async createSupplier(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const newSupplier = this.supplierRepository.createSupplier(createSupplierDto);

    return newSupplier.catch((e) => {
      this.handleDBErrors(e)
    });
  }

  async updateSupplier(updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const newSupplier = this.supplierRepository.updateSupplier(updateSupplierDto);

    if (!newSupplier) {
      throw new NotFoundException('Proveedor no encontrado.');
    }

    return newSupplier.catch((e) => {
      this.handleDBErrors(e)
    });
  }

  async deleteSupplier(id): Promise<Object> {
    const deleteResponse = await this.supplierRepository.deleteSupplier(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException('Cliente no encontrada.');
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Cliente eliminado exitosamente.',
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }
}
