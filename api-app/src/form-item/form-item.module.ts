import { Module } from '@nestjs/common';
import { FormItemService } from './form-item.service';
import { FormItemController } from './form-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormItem } from './entities/form-item.entity';
import { FormModule } from 'src/form/form.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([FormItem]),
    FormModule,
  ],
  controllers: [FormItemController],
  providers: [FormItemService],
  exports: [TypeOrmModule]
})
export class FormItemModule {}
