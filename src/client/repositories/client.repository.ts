import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../entities/client.entity";
import { Repository } from "typeorm";
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
  ) { }

  async getClients(): Promise<Client[]> {
    return await this.clientRepository.find({
      select: {
        id: true, name: true, lastname: true, address: true, phone: true, email: true, createdAt: true,
      },
      relations: {
        // user: true,
      },
      order: {
        lastname: 'desc',
      },
      withDeleted: true
    });
  }

  async getClient(id: number): Promise<Client> {
    return await this.clientRepository.findOne({
      where: { id },
      select: {
        id: true, name: true, lastname: true, address: true, phone: true, email: true, createdAt: true,
      },
      relations: {
        // user: true,
      },
      order: {
        lastname: 'desc',
      },
      withDeleted: true
    });
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const { ...clientData } = createClientDto
    const newClient = this.clientRepository.create({
      ...clientData
    });

    return await this.clientRepository.save(newClient)
  }

  async updateRole({ id, name }: UpdateClientDto): Promise<Client> {
    const clientUpdate: Client = await this.clientRepository.preload({
      id, name
    });

    await this.clientRepository.save(clientUpdate)

    return clientUpdate;
  }

  async deleteClient(id: number): Promise<any> {
    return await this.clientRepository.softDelete(id);
  }

}