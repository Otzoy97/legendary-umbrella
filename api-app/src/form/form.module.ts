import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form]),
  ],
  controllers: [FormController],
  providers: [FormService],
  exports: [TypeOrmModule]
})
export class FormModule {}
