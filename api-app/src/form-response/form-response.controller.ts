import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateFormResponseDto } from './dto/create-form-response.dto';
import { FormResponseService } from './form-response.service';

@Controller('form-response')
export class FormResponseController {
  constructor(private readonly formResponseService: FormResponseService) { }

  @Post(':formId')
  async create(
    @Param('formId') formId: string,
    @Body() createFormResponseDto: CreateFormResponseDto) {
    return await this.formResponseService.create(+formId, createFormResponseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('page_size') pageSize: number,
    @Query('form_id') formId: number,
  ) {
    const query = {
      page: page || 1,
      pageSize: pageSize || 10,
      formId: formId || null
    }
    return await this.formResponseService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':responseId')
  async findOne(
    @Param('responseId') responseId: string
  ) {
    return await this.formResponseService.findOne(+responseId);
  }

}
