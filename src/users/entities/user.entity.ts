import { Column, CreateDateColumn, DeleteDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../../role/entities/role.entity";

export class User {
  @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column('text', { nullable: false })
    name: string

    @Column('text', { nullable: false })
    lastname: string;

    @Column('text', { nullable: true })
    dni: string;

    @Column('text', { nullable: false, unique: true })
    username: string;

    @Column('text', { select: false })
    password: string;

    @Column('text', { nullable: false })
    email: string;

    @Column('text', { nullable: true, default: 'assets/images/user/admin.jpg' })
    img: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Role, (typeUser) => typeUser.users)
    role: Role;
}
