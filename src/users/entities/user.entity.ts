import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../../role/entities/role.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column('text', { nullable: false })
    name: string

    @Column('text', { nullable: false })
    lastname: string;

    @Column('text', { nullable: false })
    dni: string;

    @Column('text', { nullable: false, unique: true })
    username: string;

    @Column('text', { select: false })
    password: string;

    @Column('text', { nullable: false })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Role, userToRole => userToRole.users)
    role: Role;

    @OneToMany(() => Order, orders => orders.user)
    orders: Order;
}
