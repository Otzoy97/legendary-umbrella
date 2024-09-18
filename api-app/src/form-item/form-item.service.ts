import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormItemDto } from './dto/create-form-item.dto';
import { UpdateFormItemDto } from './dto/update-form-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { FormItem } from './entities/form-item.entity';
import { Form } from '../form/entities/form.entity';
import { response } from '../response/response';

@Injectable()
export class FormItemService {

  constructor(
    @InjectRepository(FormItem)
    private readonly formItemRepository: Repository<FormItem>,
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
    private readonly entityManager: EntityManager
  ) { }

  /**
   * Creates a new form item
   * @param formId 
   * @param createFormItemDto 
   * @returns 
   */
  async create(formId: number, createFormItemDto: CreateFormItemDto, user: any) {
    const form = await this.formRepository.findOne({ where: { id: formId }, relations: ['items'], select: { id: true, items: true } });
    if (!form) {
      throw new NotFoundException('Form not found');
    }

    const maxOrder = (form.items && (form.items.length > 0))
      ? Math.max(...form.items.map(item => item.order))
      : 0;

    return await this.entityManager.transaction(async (manager) => {
      form.updatedBy = user.userId;
      form.updatedAt = new Date();
      await manager.save(form);

      const newItem = this.formItemRepository.create({
        ...createFormItemDto,
        form: { id: formId },
        order: maxOrder + 1
      });
      const persistedNewItem = await manager.save(newItem);
      return response('Form item created successfully', persistedNewItem);
    });
  }

  /**
   * Retrieves all form items
   * @param formId 
   * @returns 
   */
  async findAll(formId: number) {
    const formItems = await this.formItemRepository.find({
      where: {
        form: { id: formId }
      },
      order: {
        order: 'ASC'
      }
    });
    if (!formItems) {
      throw new NotFoundException('Form not found');
    }
    return response('Form items retrieved successfully', formItems);
  }

  /**
   * Retrieves form item by id
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    const formItem = await this.formItemRepository.findOne({ where: { id } });
    if (!formItem) {
      throw new NotFoundException('Form item not found');
    }
    return response('Form item retrieved successfully', formItem);
  }

  /**
   * Updates a form item
   * @param id
   * @param updateFormItemDto 
   * @returns 
   */
  async update(id: number, updateFormItemDto: UpdateFormItemDto, user: any) {
    // Retrieve form item
    const formItem = await this.formItemRepository.findOne({
      where: { id },
      relations: ['form'],
      select: { id: true, order: true, form: { id: true } }
    });
    if (!formItem) {
      throw new NotFoundException('Form item not found');
    }
    // Retrieve form
    const form = await this.formRepository.findOne({ where: { id: formItem.form.id }, relations: ['items'], select: { id: true, items: true } });
    if (!form) {
      throw new NotFoundException('Form not found');
    }

    return await this.entityManager.transaction(async (manager) => {
      // Update form
      form.updatedBy = user.userId;
      form.updatedAt = new Date();
      await manager.save(form);
      // Update form item
      Object.assign(formItem, updateFormItemDto);
      await manager.save(formItem);
      return response('Form item updated successfully', formItem);
    });
  }

  async remove(id: number, user: any) {
    const formItem = await this.formItemRepository.findOne({ where: { id }, relations: ['form'] });
    if (!formItem) {
      throw new NotFoundException('Form item not found');
    }
    const form = await this.formRepository.findOne({
      where: { id: formItem.form.id },
      relations: ['items']
    });
    if (!form) {
      throw new NotFoundException('Form not found');
    }

    // Update other items order
    form.items.forEach((item) => {
      if (item.order > formItem.order) {
        item.order -= 1;
      }
    });
    // Update form
    form.updatedBy = user.userId;
    form.updatedAt = new Date();
    return await this.formItemRepository.manager.transaction(async (manager) => {
      await manager.save(form.items);
      await manager.remove(formItem);
      return response('Form item removed successfully');
    });
  }
}
