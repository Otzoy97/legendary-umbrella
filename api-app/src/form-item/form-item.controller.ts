import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormItemService } from './form-item.service';
import { CreateFormItemDto } from './dto/create-form-item.dto';
import { UpdateFormItemDto } from './dto/update-form-item.dto';

@Controller('form-item')
export class FormItemController {
  constructor(private readonly formItemService: FormItemService) {}

  @Post()
  create(@Body() createFormItemDto: CreateFormItemDto) {
    return this.formItemService.create(createFormItemDto);
  }

  @Get()
  findAll() {
    return this.formItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormItemDto: UpdateFormItemDto) {
    return this.formItemService.update(+id, updateFormItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formItemService.remove(+id);
  }
}
