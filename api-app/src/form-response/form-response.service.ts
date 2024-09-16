import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormResponseItem } from 'src/form-response-item/entities/form-response-item.entity';
import { Form } from 'src/form/entities/form.entity';
import { response } from 'src/response/response';
import { Repository } from 'typeorm';
import { CreateFormResponseDto } from './dto/create-form-response.dto';
import { FormResponse } from './entities/form-response.entity';

@Injectable()
export class FormResponseService {

  constructor(
    @InjectRepository(FormResponse)
    private readonly formResponseRepository: Repository<FormResponse>,
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
    @InjectRepository(FormResponseItem)
    private readonly formResponseItemRepository: Repository<FormResponseItem>,
  ) { }

  /**
   * Creates a new form response
   * @param formId 
   * @param createFormResponseDto 
   */
  async create(formId: number, createFormResponseDto: CreateFormResponseDto) {
    // Check if form exists
    const form = await this.formRepository.findOne({ where: { id: formId }, relations: ['items'] });
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    // Create the response
    return await this.formResponseRepository.manager.transaction(async (manager) => {
      // Create the form response
      const formResponse = this.formResponseRepository.create({
        form
      });
      await manager.save(formResponse);
      // Create the form response items
      createFormResponseDto.items.forEach(async item => {
        const formItem = form.items.find(i => i.uuid === item.formItemId);
        if (!formItem) {
          throw new NotFoundException('Form item not found');
        }
        const formResponseItem = this.formResponseItemRepository.create({
          formResponse,
          item: formItem,
          value: item.value
        });
        await manager.save(formResponseItem);
      });

      return response('Form response created successfully');
    });
  }

  /**
   * Retrieves paginated form responses
   * @param paginatedQueryDto 
   * @returns 
   */
  async findAll(query: any) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;
    const where: any = {};

    if (query.formId) {
      where.form = { id: query.formId };
    }

    const options = {
      where,
      skip: (page - 1) * pageSize,
      take: pageSize
    }

    const [formResponses, total] = await this.formResponseRepository.findAndCount(options);
    const payload = {
      data: formResponses,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize)
    };

    return response('Form responses retrieved successfully', payload);
  }

  /**
   * Retrieves form response by id
   * @param responseId 
   * @returns 
   */
  async findOne(responseId: number) {
    const formResponse = await this.formResponseRepository.findOne({ where: { id: responseId }, relations: ['responseItems'] });
    if (!formResponse) {
      throw new NotFoundException('Form response not found');
    }
    return response('Form response retrieved successfully', formResponse);
  }
}
