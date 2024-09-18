import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createFormDto: CreateFormDto,
    @Req() req: Request
  ) {
    const user = req.user;
    return await this.formService.create(createFormDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('page_size') pageSize: number,
  ) {
    const query = {
      page: page || 1,
      pageSize: pageSize || 10
    }
    return await this.formService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.formService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
    @Req() req: Request) {
    const user = req.user;
    return await this.formService.update(+id, updateFormDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.formService.remove(+id);
  }
}
