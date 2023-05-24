import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string

  @Column('text', { nullable: false })
  lastname: string;

  @Column('text', { nullable: true })
  address: string;

  @Column('text', { nullable: false, unique: true })
  phone: string;

  @Column('text', { nullable: false })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}
