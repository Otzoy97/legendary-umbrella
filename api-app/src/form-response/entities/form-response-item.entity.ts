import { FormItem } from "src/form-item/entities/form-item.entity";
import { FormResponse } from "src/form-response/entities/form-response.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(['formResponse', 'item'], { unique: true })
export class FormResponseItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', nullable: true })
  value: string;

  @ManyToOne(() => FormResponse, formResponse => formResponse.responseItems, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  formResponse: FormResponse;

  @ManyToOne(() => FormItem, formItem => formItem.responseItems, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  item: FormItem;
}