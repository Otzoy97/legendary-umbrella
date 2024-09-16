import { FormItem } from "src/form-item/entities/form-item.entity";
import { FormResponse } from "src/form-response/entities/form-response.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FormResponseItem {
  @Column({ type: 'nvarchar' })
  value: string;

  @PrimaryColumn({ type: 'int', name: 'formResponseId' })
  @ManyToOne(() => FormResponse, formResponse => formResponse.responseItems, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'formResponseId', referencedColumnName: 'id' })
  formResponse: FormResponse;

  @PrimaryColumn({ type: 'uuid', name: 'formItemUuid' })
  @ManyToOne(() => FormItem, formItem => formItem.responseItems, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'formItemUuid', referencedColumnName: 'uuid' })
  item: FormItem;
}