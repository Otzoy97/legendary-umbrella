import { Form } from "src/form/entities/form.entity";
import { Check, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormResponseItem } from "src/form-response/entities/form-response-item.entity";

@Entity()
@Check(`"type" IN ('text', 'number', 'multiple', 'date', 'single')`)
export class FormItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'bit', default: false })
    required: boolean;

    @Column({ type: 'varchar', default: 'text' })
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
