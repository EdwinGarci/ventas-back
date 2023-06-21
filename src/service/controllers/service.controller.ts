import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entities/service.entity';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getServices(): Promise<Service[]> {
    return this.serviceService.getServices();
  }

  @Get(':id')
  getService(@Param('id') id): Promise<Service> {
    return this.serviceService.getService(id);
  }

  @Post()
  createRole(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceService.createService(createServiceDto);
  }

  @Patch()
  updateRole(@Body() updateServiceDto: UpdateServiceDto): Promise<Service> {
    return this.serviceService.updateService(updateServiceDto);
  }

  @Delete(':id')
  deleteService(@Param('id') id: number): Promise<Object> {
    return this.serviceService.deleteService(id);
  }
}
