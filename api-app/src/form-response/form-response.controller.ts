import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormResponseService } from './form-response.service';
import { CreateFormResponseDto } from './dto/create-form-response.dto';
import { UpdateFormResponseDto } from './dto/update-form-response.dto';

@Controller('form-response')
export class FormResponseController {
  constructor(private readonly formResponseService: FormResponseService) {}

  @Post()
  create(@Body() createFormResponseDto: CreateFormResponseDto) {
    return this.formResponseService.create(createFormResponseDto);
  }

  @Get()
  findAll() {
    return this.formResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormResponseDto: UpdateFormResponseDto) {
    return this.formResponseService.update(+id, updateFormResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formResponseService.remove(+id);
  }
}
