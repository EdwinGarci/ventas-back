import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderRepository } from './repositories/order.repository';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { SupplierRepository } from 'src/supplier/repositories/supplier.repository';
import { ClientRepository } from 'src/client/repositories/client.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { Payment } from 'src/payment/entities/payment.entity';
import { PaymentRepository } from 'src/payment/repositories/payment.repository';
import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleRepository } from 'src/role/repositories/role.repository';

@Module({
  imports: [
    AuthModule, 
    TypeOrmModule.forFeature([Order, OrderDetail, Supplier, Payment, Client, User, Role])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRepository,
    SupplierRepository,
    ClientRepository,
    UserRepository,
    PaymentRepository,
    RoleRepository,
  ]
})
export class OrdersModule {}
