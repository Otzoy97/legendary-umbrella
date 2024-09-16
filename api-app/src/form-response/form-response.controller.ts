import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateFormResponseDto } from './dto/create-form-response.dto';
import { FormResponseService } from './form-response.service';

@Controller('form-response')
export class FormResponseController {
  constructor(private readonly formResponseService: FormResponseService) { }

  @Post(':formId')
  create(
    @Param('formId') formId: string,
    @Body() createFormResponseDto: CreateFormResponseDto) {
    return this.formResponseService.create(+formId, createFormResponseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('page-size') pageSize: number,
    @Query('formId') formId: number,
  ) {
    const query = {
      page,
      pageSize,
      formId
    }
    return this.formResponseService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':responseId')
  findOne(
    @Param('responseId') responseId: string
  ) {
    return this.formResponseService.findOne(+responseId);
  }

}
