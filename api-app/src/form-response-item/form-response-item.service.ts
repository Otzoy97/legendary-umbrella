import { Injectable } from '@nestjs/common';
import { CreateFormResponseItemDto } from './dto/create-form-response-item.dto';
import { UpdateFormResponseItemDto } from './dto/update-form-response-item.dto';

@Injectable()
export class FormResponseItemService {
  create(createFormResponseItemDto: CreateFormResponseItemDto) {
    return 'This action adds a new formResponseItem';
  }

  findAll() {
    return `This action returns all formResponseItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formResponseItem`;
  }

  update(id: number, updateFormResponseItemDto: UpdateFormResponseItemDto) {
    return `This action updates a #${id} formResponseItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} formResponseItem`;
  }
}
