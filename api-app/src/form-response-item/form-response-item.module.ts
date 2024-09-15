import { Module } from '@nestjs/common';
import { FormResponseItemService } from './form-response-item.service';
import { FormResponseItemController } from './form-response-item.controller';

@Module({
  controllers: [FormResponseItemController],
  providers: [FormResponseItemService],
})
export class FormResponseItemModule {}
