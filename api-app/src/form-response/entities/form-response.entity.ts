import { FormResponseItem } from "src/form-response/entities/form-response-item.entity";
import { Form } from "src/form/entities/form.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class FormResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Form, form => form.responses, { nullable: false })
  form: Form;

  @OneToMany(() => FormResponseItem, formResponseItem => formResponseItem.formResponse, { cascade: true, onDelete: 'CASCADE' })
  responseItems: FormResponseItem[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
