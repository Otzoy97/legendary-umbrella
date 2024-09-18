import { FormItem } from "src/form-item/entities/form-item.entity";
import { FormResponse } from "src/form-response/entities/form-response.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @OneToMany(() => FormItem, formItem => formItem.form, { cascade: true, onDelete: 'CASCADE' })
    items: FormItem[];

    @OneToMany(() => FormResponse, formResponse => formResponse.form, { cascade: true, onDelete: 'CASCADE' })
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