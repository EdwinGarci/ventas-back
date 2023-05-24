import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientService } from '../services/client.service';
import { Client } from '../entities/client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  // @Auth(ValidRoles.Administrador)
  getClients(): Promise<Client[]> {
    return this.clientService.getClients();
  }

  @Get(':id')
  // @Auth(ValidRoles.Enfermera, ValidRoles.Administrador)
  getClient(@Param('id') id,): Promise<Client> {
    return this.clientService.getClient(id);
  }

  @Post()
  createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(createClientDto);
  }

  // @Patch()
  // updateClient(@Body() updateClientDto: UpdateClientDto): Promise<Client> {
  //   return this.clientService.updateClient(updateClientDto);
  // }

  @Delete(':id')
  deleteClient(@Param('id') id: number): Promise<Object> {
    return this.clientService.deleteClient(id);
  }

}
