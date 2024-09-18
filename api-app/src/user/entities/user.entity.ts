import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    password: string;
}
