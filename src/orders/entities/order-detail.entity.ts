import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Service } from "src/service/entities/service.entity";

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  unit_price: number;

  @Column({ nullable: false })
  total: number;

  @Column({ nullable: false })
  status_detail: string; // (procesado, en espera, cancelado, etc.)

  @Column({ nullable: false })
  description_service: string;

  @ManyToOne(() => Order, order => order.order_details)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Service, service => service.order_details)
  @JoinColumn({ name: 'service_id' })
  service: Service;

}