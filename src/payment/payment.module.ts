import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrderRepository } from 'src/orders/repositories/order.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { RoleRepository } from 'src/role/repositories/role.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { ClientRepository } from 'src/client/repositories/client.repository';
import { SupplierRepository } from 'src/supplier/repositories/supplier.repository';
import { OrderDetail } from 'src/orders/entities/order-detail.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';


@Module({
  imports: [
    AuthModule, 
    TypeOrmModule.forFeature([Payment, Order, OrderDetail, Supplier, Client, User, Role])],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentRepository,
    OrderRepository,
    SupplierRepository,
    ClientRepository,
    UserRepository,
    RoleRepository,
  ]
})
export class PaymentModule {}
