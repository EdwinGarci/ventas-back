import { Order } from "src/orders/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string

  @Column('text', { nullable: false })
  ruc: string
  
  @Column('text', { nullable: false })
  address: string;
  
  @Column('text', { nullable: false, unique: true })
  phone: string;
  
  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
  type_product: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Order, order => order.suppliers)
  @JoinTable({
    name: 'order_supplier', // Nombre de la tabla intermedia
    joinColumn: {
      name: 'supplier_id', // Nombre de la columna de unión que hace referencia a Supplier
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'order_id', // Nombre de la columna de unión que hace referencia a Order
      referencedColumnName: 'id',
    },
  })
  orders: Order[];
}
