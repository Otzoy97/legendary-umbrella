import { Module } from '@nestjs/common';
import { FormResponseService } from './form-response.service';
import { FormResponseController } from './form-response.controller';

@Module({
  controllers: [FormResponseController],
  providers: [FormResponseService],
})
export class FormResponseModule {}
