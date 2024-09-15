import { Injectable } from '@nestjs/common';
import { CreateFormItemDto } from './dto/create-form-item.dto';
import { UpdateFormItemDto } from './dto/update-form-item.dto';

@Injectable()
export class FormItemService {
  create(createFormItemDto: CreateFormItemDto) {
    return 'This action adds a new formItem';
  }

  findAll() {
    return `This action returns all formItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formItem`;
  }

  update(id: number, updateFormItemDto: UpdateFormItemDto) {
    return `This action updates a #${id} formItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} formItem`;
  }
}
