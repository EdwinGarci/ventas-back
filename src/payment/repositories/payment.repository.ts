import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "../entities/payment.entity";
import { Repository } from "typeorm";
import { OrderRepository } from "src/orders/repositories/order.repository";

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    private readonly orderRepository: OrderRepository,
  ) { }


}