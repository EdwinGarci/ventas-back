import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "../entities/payment.entity";
import { Repository } from "typeorm";
import { OrderRepository } from "src/orders/repositories/order.repository";
import { CreatePaymentDto } from "../dto/create-payment.dto";
import { UpdatePaymentDto } from "../dto/update-payment.dto";

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    private readonly orderRepository: OrderRepository,
  ) { }

  async getPayments(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: {
        order: true, 
      },
    });
  }

  async getPayment(id: number): Promise<Payment> {
    return await this.paymentRepository.findOne({
      where: {
        id
      },
      relations: {
        order: true,
      }
    });
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { payment_date, payment_amount, way_to_pay, payment_status, reconciliation_status, order } = createPaymentDto;
    
    const forder = await this.orderRepository.getOrder(order);

    const newPayment = this.paymentRepository.create({ 
      payment_date, payment_amount, way_to_pay, payment_status, reconciliation_status, order: forder,
    });

    await this.paymentRepository.save(newPayment).catch((e) => {
      return e;
    });

    const mergedEntity = Object.assign(newPayment);

    return mergedEntity;
  }

  async updatePayment(updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const { id, payment_date, payment_amount, way_to_pay, payment_status, reconciliation_status, order } = updatePaymentDto;

    const forder = await this.orderRepository.getOrder(order);

    const paymentUpdate: Payment = await this.paymentRepository.preload({
      id, payment_date, payment_amount, way_to_pay, payment_status, reconciliation_status, order: forder,
    });

    await this.paymentRepository.save(paymentUpdate).catch((e) => {
      return e;
    });

    const mergedEntity = Object.assign(paymentUpdate);

    return mergedEntity
  }
  
  async deletePayment(id: number): Promise<any> {
    return await this.paymentRepository.softDelete(id);
  }

}