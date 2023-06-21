import { Order } from "src/orders/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  payment_date: Date;

  @Column({ nullable: false })
  payment_amount: number;

  @Column('text', { nullable: false })
  way_to_pay: string;//forma de pago

  @Column('text', { nullable: false })
  payment_status: string;

  @Column('text', { nullable: false })
  reconciliation_status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Order, order => order.payments)
  @JoinColumn({ name: 'order_id' })
  order: Order;

}
