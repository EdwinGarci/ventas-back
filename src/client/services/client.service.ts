import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientRepository } from '../repositories/client.repository';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientService {

  constructor(
    private readonly clientRepository: ClientRepository,
  ){ }

  async getClients(): Promise<Client[]> {
    //Consulta
    const clients: Client[] = await this.clientRepository.getClients();

    //Mensaje para cuando salga mal la consulta
    if (!clients) throw new NotFoundException("Algo salió mal.");

    //Mensaje para cuando no se encuentren registros
    if (clients && clients.length == 0) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'No hay clientes para mostrar.',
    }, HttpStatus.NOT_FOUND)

    return clients;
  }

  async getClient(id: number): Promise<Client> {
    //Consulta
    const mclient = await this.clientRepository.getClient(id);

    //Mensaje para cuando salga mal la consulta
    if (!mclient) throw new NotFoundException("El cliente no existe.");

    return mclient;
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const newClient = await this.clientRepository.createClient(createClientDto);

    return newClient
  }

  async updateClient({id, name, lastname, address, email, phone }: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.getClient(id);
    
    if (!client) {
      throw new NotFoundException('Cliente no encontrado.');
    }

    const clientUpdate = await this.clientRepository.updateClient({id, name, lastname, address, email, phone});

    return clientUpdate;
  }

  async deleteClient(id): Promise<Object> {
    const deleteResponse = await this.clientRepository.deleteClient(id);
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
