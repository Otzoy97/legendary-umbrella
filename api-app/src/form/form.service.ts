import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from '../response/response';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';

@Injectable()
export class FormService {

  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>
  ) { }

  /**
   * Creates a new form
   * @param createFormDto 
   * @returns 
   */
  async create(createFormDto: CreateFormDto, user: any) {
    const form = {
      ...createFormDto,
      createdBy: user.userId,
      updatedBy: user.userId
    }
    const persistedForm = await this.formRepository.save(form);
    return response('Form created successfully', persistedForm);
  }

  /**
   * Retrieves paginated forms
   * @param query 
   * @returns 
   */
  async findAll(query: any) {
    const page = query.page;
    const pageSize = query.pageSize;
    const [forms, total] = await this.formRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['createdBy', 'updatedBy'],
      select: {
        createdBy: {
          id: true,
          username: true,
        },
        updatedBy: {
          id: true,
          username: true,
        }
      }
    });

    const payload = {
      data: forms,
      total
    };
    return response('Forms retrieved successfully', payload);
  }

  /**
   * Retrieves form by id
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    const form = await this.formRepository.findOne({ where: { id } });
    if (!form) {
      throw new NotFoundException(`Form not found`);
    }
    return response('Form retrieved successfully', form);
  }

  /**
   * Updates form by id
   * @param id 
   * @param updateFormDto 
   * @returns 
   */
  async update(id: number, updateFormDto: UpdateFormDto, user: any) {
    const form = {
      ...updateFormDto,
      updatedBy: user.userId
    }
    const result = await this.formRepository.update(id, form);
    if (result.affected === 0) {
      throw new NotFoundException(`Form not found`);
    }
    return response('Form updated successfully');
  }

  /**
   * Removes form by id and its associated items and responses
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    const form = await this.formRepository.findOne({ where: { id } });
    if (!form) {
      throw new NotFoundException(`Form not found`);
    }
    await this.formRepository.remove(form);
    return response('Form deleted successfully');
  }
}
