import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormResponseItem } from './entities/form-response-item.entity';
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
        form: { id: formId }
      });
      const persistedResponse = await manager.save(formResponse);

      const formResponseItems = createFormResponseDto.items.map(item => {
        return this.formResponseItemRepository.create({
          formResponse: persistedResponse,
          item: { id: item.id },
          value: item.value
        });
      });

      await manager.save(formResponseItems);
      return response('Form response created successfully');
    });
  }

  /**
   * Retrieves paginated form responses
   * @param paginatedQueryDto 
   * @returns 
   */
  async findAll(query: any) {
    const page = query.page;
    const pageSize = query.pageSize;
    const where: any = {};

    if (query.formId) {
      where.form = { id: query.formId };
    }

    const options = {
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['form']
    }

    const [formResponses, total] = await this.formResponseRepository.findAndCount(options);
    const payload = {
      data: formResponses,
      total
    };

    return response('Form responses retrieved successfully', payload);
  }

  /**
   * Retrieves form response by id
   * @param responseId 
   * @returns 
   */
  async findOne(responseId: number) {
    const formResponse = await this.formResponseRepository.findOne({
      where: { id: responseId },
      relations: ['responseItems', 'responseItems.item', 'form'],
      order: {
        responseItems: {
          item: {
            order: 'ASC'
          }
        }
      }
    });
    if (!formResponse) {
      throw new NotFoundException('Form response not found');
    }
    return response('Form response retrieved successfully', formResponse);
  }
}
