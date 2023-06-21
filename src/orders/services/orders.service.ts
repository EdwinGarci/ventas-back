import { Injectable, NotFoundException, HttpException, HttpStatus, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  
  constructor(
    private readonly orderRepository: OrderRepository,
  ){ }

  async getOrders(): Promise<Order[]> {
    const orders: Order[] = await this.orderRepository.getOrders();

    if (!orders) throw new NotFoundException("Algo salió mal.");

    if (orders && orders.length == 0) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'No hay ordenes para mostrar.',
    }, HttpStatus.NOT_FOUND)

    return orders;
  }

  async getOrder(id: number): Promise<Order> {
    const morder = await this.orderRepository.getOrder(id);

    if (!morder) throw new NotFoundException("La orden no existe.");

    return morder;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.createOrder(createOrderDto);

    if (!createOrderDto.user) {
      throw new NotFoundException("El usuario no existe.");
    }

    if (!createOrderDto.client) {
      throw new NotFoundException("El cliente no existe.");
    }

    if (!createOrderDto.suppliers) {
      throw new NotFoundException("El proveedor no existe.");
    }

    return newOrder.catch((e) => {
      this.handleDBErrors(e)
    });
  }

  async updateOrder(updateOrderDto: UpdateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.updateOrder(updateOrderDto);

    if (!newOrder) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No se ha podido crear la orden.',
      }, HttpStatus.NOT_FOUND);
    }

    if (!updateOrderDto.user) {
      throw new NotFoundException("El usuario no existe.");
    }

    if (!updateOrderDto.client) {
      throw new NotFoundException("El cliente no existe.");
    }

    if (!updateOrderDto.suppliers) {
      throw new NotFoundException("El proveedor no existe.");
    }

    return newOrder.catch((e) => {
      this.handleDBErrors(e)
    });
  }

  async deleteOrder(id): Promise<Object> {
    const deleteResponse = await this.orderRepository.deleteOrder(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException('Orden no encontrada.');
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
