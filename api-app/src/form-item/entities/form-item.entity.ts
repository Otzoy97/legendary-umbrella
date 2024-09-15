import { Form } from "src/form/entities/form.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum FormItemType {
    TEXT = 'text',
    NUMBER = 'number',
    MULTIPLE = 'multiple',
    DATE = 'date',
    SINGLE = 'single',
}

@Entity()
export class FormItem {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column({ type: 'varchar' })
    name: string;
    @Column({ type: 'boolean', default: false })
    required: boolean;
    @Column({ type: 'enum', enum: FormItemType, default: FormItemType.TEXT })
    type: FormItemType;
    @Column({ type: 'text', nullable: true })
    options: string;
    @ManyToOne(() => Form, form => form.items)
    form: Form;
}
