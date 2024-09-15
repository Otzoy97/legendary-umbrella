import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormResponseItemService } from './form-response-item.service';
import { CreateFormResponseItemDto } from './dto/create-form-response-item.dto';
import { UpdateFormResponseItemDto } from './dto/update-form-response-item.dto';

@Controller('form-response-item')
export class FormResponseItemController {
  constructor(private readonly formResponseItemService: FormResponseItemService) {}

  @Post()
  create(@Body() createFormResponseItemDto: CreateFormResponseItemDto) {
    return this.formResponseItemService.create(createFormResponseItemDto);
  }

  @Get()
  findAll() {
    return this.formResponseItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formResponseItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormResponseItemDto: UpdateFormResponseItemDto) {
    return this.formResponseItemService.update(+id, updateFormResponseItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formResponseItemService.remove(+id);
  }
}
