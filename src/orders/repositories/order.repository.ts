import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../entities/order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { SupplierRepository } from 'src/supplier/repositories/supplier.repository';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { ClientRepository } from 'src/client/repositories/client.repository';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    private readonly supplierRepository: SupplierRepository,
    private readonly clientRepository: ClientRepository,
    private readonly userRepository: UserRepository
  ) { }

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: {
        client: true, user: true, suppliers: true, order_details: true, 
      },
    });
  }

  async getOrder(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        id
      },
      relations: {
        client: true, user: true, suppliers: true, order_details: true,
      }
    });
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { deadline, order_total, order_status, observations, client, user, suppliers } = createOrderDto;
    
    const fsuppliers: Supplier[] = [];
    if (suppliers != null) {
      for (const item of suppliers) {
        const fsupplier = await this.supplierRepository.getSupplier(item)
        fsuppliers.push(fsupplier);
      }
    }

    const fclient = await this.clientRepository.getClient(client);
    const fuser = await this.userRepository.getUserbyUid(user);

    const newOrder = this.orderRepository.create({ 
      deadline, order_total, order_status, observations, client: fclient, user: fuser, suppliers: fsuppliers
    });
    
    await this.orderRepository.save(newOrder).catch((e) => {
      return e;
    });

    const mergedEntity = Object.assign(newOrder);

    return mergedEntity
  }

  async updateOrder(updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { id, deadline, order_total, order_status, observations, client, user, suppliers } = updateOrderDto;    
    // const forder = await this.orderRepository.getOrder(id);
    
    const fsuppliers: Supplier[] = [];
    if (suppliers != null) {
      for (const item of suppliers) {
        const fsupplier = await this.supplierRepository.getSupplier(item)
        fsuppliers.push(fsupplier);
      }
    }

    const fclient = await this.clientRepository.getClient(client);
    const fuser = await this.userRepository.getUserbyUid(user);

    const orderUpdate: Order = await this.orderRepository.preload({
      id, deadline, order_total, order_status, observations, client: fclient, user: fuser, suppliers: fsuppliers,
    });

    await this.orderRepository.save(orderUpdate).catch((e) => {
      return e;
    });

    const mergedEntity = Object.assign(orderUpdate);

    return mergedEntity
  }

  async deleteOrder(id: number): Promise<any> {
    return await this.orderRepository.softDelete(id);
  }
}