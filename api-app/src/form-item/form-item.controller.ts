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
  create(
    @Param('formId') formId: string,
    @Body() createFormItemDto: CreateFormItemDto,
    @Req() req: Request
  ) {
    const user = req.user;
    return this.formItemService.create(+formId, createFormItemDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':formId')
  findAll(
    @Param('formId') formId: string
  ) {
    return this.formItemService.findAll(+formId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.formItemService.findOne(uuid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string, 
    @Body() updateFormItemDto: UpdateFormItemDto,
    @Req() req: Request) {
    const user = req.user;
    return this.formItemService.update(uuid, updateFormItemDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.formItemService.remove(uuid);
  }
}
