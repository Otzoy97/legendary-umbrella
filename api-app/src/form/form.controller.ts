import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createFormDto: CreateFormDto,
    @Req() req: Request
  ) {
    const user = req.user;
    return this.formService.create(createFormDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('page-size') pageSize: number,
  ) {
    const query = {
      page,
      pageSize
    }
    return this.formService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
    @Req() req: Request) {
    const user = req.user;
    return this.formService.update(+id, updateFormDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(+id);
  }
}
