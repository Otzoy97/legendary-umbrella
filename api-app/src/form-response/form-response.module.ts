import { Module } from '@nestjs/common';
import { FormResponseService } from './form-response.service';
import { FormResponseController } from './form-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormResponse } from './entities/form-response.entity';
import { FormModule } from 'src/form/form.module';
import { FormItemModule } from 'src/form-item/form-item.module';
import { FormResponseItem } from 'src/form-response-item/entities/form-response-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormResponse, FormResponseItem]),
    FormModule,
    FormItemModule
  ],
  controllers: [FormResponseController],
  providers: [FormResponseService],
})
export class FormResponseModule {}
