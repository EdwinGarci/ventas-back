import { OrderDetail } from "src/orders/entities/order-detail.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string

  @Column('text', { nullable: false })
  description: string;

  @Column({ nullable: false })
  service_price: number;
  
  @Column('text', { nullable: false })
  estimated_duration: string
  
  @Column('text', { nullable: false })
  availability: string // (disponible, agotado, en espera, etc.)
  
  @Column('text', { nullable: false })
  category: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => OrderDetail, order_detail => order_detail.service)
  order_details: OrderDetail[];
}
