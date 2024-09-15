import { Module } from '@nestjs/common';
import { FormItemService } from './form-item.service';
import { FormItemController } from './form-item.controller';

@Module({
  controllers: [FormItemController],
  providers: [FormItemService],
})
export class FormItemModule {}
