import { FormResponseItem } from "src/form-response-item/entities/form-response-item.entity";
import { Form } from "src/form/entities/form.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class FormResponse {
    @PrimaryGeneratedColumn()
    uuid: number;
    @ManyToOne(() => Form, form => form.responses)
    form: Form;
    @OneToMany(() => FormResponseItem, formResponseItem => formResponseItem.formResponse)
    responseItems: FormResponseItem[];
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;
    @CreateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}
