import { FormItem } from "src/form-item/entities/form-item.entity";
import { FormResponse } from "src/form-response/entities/form-response.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar' })
    name: string;
    @Column({ type: 'text' })
    description: string;
    @OneToMany(() => FormItem, formItem => formItem.form)
    items: FormItem[];
    @OneToMany(() => FormResponse, formResponse => formResponse.form)
    responses: FormResponse[];
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;
    @CreateDateColumn({ type: 'datetime' })
    updatedAt: Date;
    @ManyToOne(() => User)
    createdBy: User;
    @ManyToOne(() => User)
    updatedBy: User;
}