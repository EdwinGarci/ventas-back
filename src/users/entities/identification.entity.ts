import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Identification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: true })
    value: string;
}