import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  // @Auth(ValidRoles.Administrador)
  getOrders(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Get(':id')
  // @Auth(ValidRoles.Enfermera, ValidRoles.Administrador)
  getOrder(@Param('id') id,): Promise<Order> {
    return this.orderService.getOrder(id);
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Patch()
  updateOrder(@Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderService.updateOrder(updateOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number): Promise<Object> {
    return this.orderService.deleteOrder(id);
  }
}
