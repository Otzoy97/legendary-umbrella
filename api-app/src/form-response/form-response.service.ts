import { Injectable } from '@nestjs/common';
import { CreateFormResponseDto } from './dto/create-form-response.dto';
import { UpdateFormResponseDto } from './dto/update-form-response.dto';

@Injectable()
export class FormResponseService {
  create(createFormResponseDto: CreateFormResponseDto) {
    return 'This action adds a new formResponse';
  }

  findAll() {
    return `This action returns all formResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formResponse`;
  }

  update(id: number, updateFormResponseDto: UpdateFormResponseDto) {
    return `This action updates a #${id} formResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} formResponse`;
  }
}
