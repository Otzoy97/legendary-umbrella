import { Form } from "src/form/entities/form.entity";
import { Check, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormResponseItem } from "src/form-response-item/entities/form-response-item.entity";

@Entity()
@Check(`"type" IN ('text', 'number', 'multiple', 'date', 'single')`)
export class FormItem {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'bit', default: false })
    required: boolean;

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'text', nullable: true })
    options: string;

    @ManyToOne(() => Form, form => form.items)
    form: Form;

    @Column({ type: 'int' })
    order: number;
    
    @OneToMany(() => FormResponseItem, formResponseItem => formResponseItem.item)
    responseItems: FormResponseItem[];
}
