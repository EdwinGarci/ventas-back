import { Injectable, NotFoundException, HttpException, HttpStatus, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { ServiceRepository } from '../repositories/service.repository';
import { Service } from '../entities/service.entity';

@Injectable()
export class ServiceService {

  constructor(
    private readonly serviceRepository: ServiceRepository,
  ) { }

  async getServices(): Promise<Service[]> {
    const services = await this.serviceRepository.getServices();

    if (!services) throw new NotFoundException("Algo salió mal.");

    if (services && services.length == 0) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'No hay servicios para mostrar.',
    }, HttpStatus.NOT_FOUND)

    return services;
  }

  async getService(id: number): Promise<Service> {
    const service_response = await this.serviceRepository.getService(id);

    if (!service_response) throw new NotFoundException("Algo salió mal.");

    if (service_response && service_response == null) throw new HttpException({
      status: HttpStatus.ACCEPTED,
      error: 'El servicio no existe.',
    }, HttpStatus.ACCEPTED)

    return service_response;
  }

  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = this.serviceRepository.createService(createServiceDto);

    return newService.catch((e) => {
      this.handleDBErrors(e)
    });
  }

  async updateService(updateServiceDto: UpdateServiceDto): Promise<Service> {
    const { id, ...serviceData } = updateServiceDto;
    const fservice = await this.serviceRepository.getService(id);
    
    if (!fservice) {
      throw new NotFoundException('Servicio no encontrado.');
    }
    
    const newService = this.serviceRepository.updateService(updateServiceDto);

    if (!newService) {
      throw new NotFoundException('Servicio no encontrado.');
    }

    return newService.catch((e) => {
      this.handleDBErrors(e)
    });
  }

  async deleteService(id: number): Promise<Object> {
    const role = await this.serviceRepository.deleteService(id);
    if (!role.affected) {
      throw new NotFoundException('Servicio no encontrado.');
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Servicio eliminado exitosamente.',
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }
}
