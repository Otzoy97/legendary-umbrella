import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormItemDto } from './dto/create-form-item.dto';
import { UpdateFormItemDto } from './dto/update-form-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormItem } from './entities/form-item.entity';
import { Form } from 'src/form/entities/form.entity';
import { response } from 'src/response/response';

@Injectable()
export class FormItemService {

  constructor(
    @InjectRepository(FormItem)
    private readonly formItemRepository: Repository<FormItem>,
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>
  ) { }

  /**
   * Creates a new form item
   * @param formId 
   * @param createFormItemDto 
   * @returns 
   */
  async create(formId: number, createFormItemDto: CreateFormItemDto, user: any) {
    const form = await this.formRepository.findOne({ where: { id: formId } });
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    
    const maxOrder = form.items.length > 0
      ? Math.max(...form.items.map(item => item.order))
      : 0;

    this.formItemRepository.create({
      ...createFormItemDto,
      form,
      order: maxOrder + 1
    });

    form.updatedBy = user.userId;
    this.formItemRepository.save(form);

    return response('Form item created successfully');
  }

  /**
   * Retrieves all form items
   * @param formId 
   * @returns 
   */
  async findAll(formId: number) {
    const form = await this.formRepository.findOne({ where: { id: formId } });
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    return response('Form items retrieved successfully', form.items);
  }

  /**
   * Retrieves form item by uuid
   * @param uuid 
   * @returns 
   */
  async findOne(uuid: string) {
    const formItem = await this.formItemRepository.findOne({ where: { uuid } });
    if (!formItem) {
      throw new NotFoundException('Form item not found');
    }
    return response('Form item retrieved successfully', formItem);
  }

  /**
   * Updates a form item
   * @param uuid
   * @param updateFormItemDto 
   * @returns 
   */
  async update(uuid: string, updateFormItemDto: UpdateFormItemDto, user: any) {
    // Retrieve form item
    const formItem = await this.formItemRepository.findOne({
      where: { uuid },
      relations: ['form']
    });
    if (!formItem) {
      throw new NotFoundException('Form item not found');
    }

    // // Retrieve form
    // const form = formItem.form;
    // Update form item
    Object.assign(formItem, updateFormItemDto);
    // // Update other items order
    // form.items.forEach((item) => {
    //   if (item.order >= updateFormItemDto.order && item.uuid !== formItem.uuid) {
    //     item.order += 1;
    //   }
    // });
    // Update form
    formItem.form.updatedBy = user.userId;
    await this.formItemRepository.save(formItem);
    // await this.formItemRepository.save(form.items);
    return response('Form item updated successfully');
  }

  async remove(uuid: string) {
    const form = await this.formItemRepository.findOne({ where: { uuid } });
    if (!form) {
      throw new NotFoundException('Form item not found');
    }
    await this.formItemRepository.remove(form);
    return response('Form item removed successfully');
  }
}
