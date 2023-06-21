import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrderRepository } from 'src/orders/repositories/order.repository';
import { PaymentRepository } from './repositories/payment.repository';


@Module({
  imports: [
    AuthModule, 
    TypeOrmModule.forFeature([Payment, Order])],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentRepository,
    OrderRepository
  ]
})
export class PaymentModule {}
