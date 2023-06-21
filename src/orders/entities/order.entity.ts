import { Client } from "src/client/entities/client.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderDetail } from "./order-detail.entity";
import { Payment } from "src/payment/entities/payment.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: false })
  deadline: Date;

  @Column({ nullable: false })
  order_total: number;

  @Column({ nullable: false })
  order_status: string;

  @Column({ nullable: false })
  observations:string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Client, client => client.orders)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Supplier)
  @JoinTable({
    name: 'order_supplier',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'supplier_id',
      referencedColumnName: 'id',
    },
  })
  suppliers: Supplier[];

  @OneToMany(() => OrderDetail, order_detail => order_detail.order)
  order_details: OrderDetail[];

  @OneToMany(() => Payment, payment => payment.order)
  payments: Payment[];
  
}
