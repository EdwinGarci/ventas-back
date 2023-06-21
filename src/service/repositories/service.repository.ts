import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
  ) { }

  async getServices(): Promise<Service[]> {
    return await this.serviceRepository.find({
      relations: {
        order_details: true,
      },
    });
  }

  async getService(id: number): Promise<Service> {
    return await this.serviceRepository.findOne({
      where: {
        id
      },
    });
  }

  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    const { name, description, service_price, estimated_duration, availability, category } = createServiceDto;
    
    const newService = this.serviceRepository.create({ 
      name, description, service_price, estimated_duration, availability, category
    });

    return this.serviceRepository.save(newService);
  }

  async updateService(updateServiceDto: UpdateServiceDto): Promise<Service> {
    const { id, name, description, service_price, estimated_duration, availability, category } = updateServiceDto;
    
    const serviceUpdate: Service = await this.serviceRepository.preload({
      id, name, description, service_price, estimated_duration, availability, category
    });

    await this.serviceRepository.save(serviceUpdate)

    return serviceUpdate;
  }

  async deleteService(id: number): Promise<any> {
    return await this.serviceRepository.softDelete(id);
  }

}