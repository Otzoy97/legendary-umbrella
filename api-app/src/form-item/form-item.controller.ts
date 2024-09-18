import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FormItemService } from './form-item.service';
import { CreateFormItemDto } from './dto/create-form-item.dto';
import { UpdateFormItemDto } from './dto/update-form-item.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('form-item')
export class FormItemController {
  constructor(private readonly formItemService: FormItemService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':formId')
  async create(
    @Param('formId') formId: string,
    @Body() createFormItemDto: CreateFormItemDto,
    @Req() req: Request
  ) {
    const user = req.user;
    return await this.formItemService.create(+formId, createFormItemDto, user);
  }

  @Get(':formId')
  findAll(
    @Param('formId') formId: string
  ) {
    return this.formItemService.findAll(+formId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formItemService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateFormItemDto: UpdateFormItemDto,
    @Req() req: Request
  ) {
    const user = req.user;
    return await this.formItemService.update(+id, updateFormItemDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const user = req.user;
    return this.formItemService.remove(+id, user);
  }
}
