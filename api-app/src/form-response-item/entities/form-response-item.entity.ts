import { FormItem } from "src/form-item/entities/form-item.entity";
import { FormResponse } from "src/form-response/entities/form-response.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FormResponseItem {
    @ManyToOne(() => FormResponse, formResponse => formResponse.responseItems)
    formResponse: FormResponse;
    @ManyToOne(() => FormItem)
    item: FormItem;
    @Column({ type: 'text' })
    value: string;
}