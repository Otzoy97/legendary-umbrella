import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, Repository } from 'typeorm';
import { FormItemService } from './form-item.service';
import { FormItem } from './entities/form-item.entity';
import { Form } from '../form/entities/form.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateFormItemDto, FormItemType } from './dto/create-form-item.dto';
import { UpdateFormItemDto } from './dto/update-form-item.dto';

describe('FormItemService', () => {
  let service: FormItemService;
  let formItemRepository: jest.Mocked<Repository<FormItem>>;
  let formRepository: jest.Mocked<Repository<Form>>;
  let entityManager: jest.Mocked<EntityManager>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormItemService,
        {
          provide: 'FormItemRepository',
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: 'FormRepository',
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            transaction: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FormItemService>(FormItemService);
    formItemRepository = module.get('FormItemRepository');
    formRepository = module.get('FormRepository');
    entityManager = module.get<EntityManager>(EntityManager) as jest.Mocked<EntityManager>;
  });

  describe('create', () => {
    it('should create a new form item', async () => {
      const formId = 1;
      const createFormItemDto: CreateFormItemDto = { 
        name: 'Test Item', 
        type: FormItemType.TEXT,
        order: 2,
        required: true,
        options: ''
      };
      const user = { userId: 1 };
      const form = { id: formId, items: [{ order: 1 }] };
      const newItem = { id: 1, ...createFormItemDto, order: 2 };

      formRepository.findOne.mockResolvedValue(form as Form);
      formItemRepository.create.mockReturnValue(newItem as FormItem);
      entityManager.transaction.mockImplementation(async (isolationLevelOrRunInTransaction, maybeRunInTransaction) => {
        const runInTransaction = typeof isolationLevelOrRunInTransaction === 'function' ? isolationLevelOrRunInTransaction : maybeRunInTransaction;
        return runInTransaction(entityManager);
      });
      entityManager.save.mockResolvedValueOnce(form);
      entityManager.save.mockResolvedValueOnce(newItem);

      const result = await service.create(formId, createFormItemDto, user);

      expect(formRepository.findOne).toHaveBeenCalledWith({ where: { id: formId }, relations: ['items'], select: { id: true, items: true } });
      expect(formItemRepository.create).toHaveBeenCalledWith({
        ...createFormItemDto,
        form: { id: formId },
        order: 2,
      });
      expect(entityManager.save).toHaveBeenCalledWith(form);
      expect(entityManager.save).toHaveBeenCalledWith(newItem);
      expect(result).toEqual({ message: 'Form item created successfully', payload: newItem });
    });

    it('should throw NotFoundException if form is not found', async () => {
      formRepository.findOne.mockResolvedValue(null);

      await expect(service.create(1, {} as CreateFormItemDto, { userId: 1 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should retrieve all form items', async () => {
      const formId = 1;
      const formItems = [{ id: 1, name: 'Item 1', order: 1 }];

      formItemRepository.find.mockResolvedValue(formItems as FormItem[]);

      const result = await service.findAll(formId);

      expect(formItemRepository.find).toHaveBeenCalledWith({
        where: { form: { id: formId } },
        order: { order: 'ASC' },
      });
      expect(result).toEqual({ message: 'Form items retrieved successfully', payload: formItems });
    });
  });

  describe('findOne', () => {
    it('should retrieve a form item by id', async () => {
      const formItem = { id: 1, name: 'Item 1' };

      formItemRepository.findOne.mockResolvedValue(formItem as FormItem);

      const result = await service.findOne(1);

      expect(formItemRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual({ message: 'Form item retrieved successfully', payload: formItem });
    });

    it('should throw NotFoundException if form item is not found', async () => {
      formItemRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a form item', async () => {
      const formItemId = 1;
      const updateFormItemDto: UpdateFormItemDto = { name: 'Updated Item' };
      const user = { userId: 1 };
      const formItem = { id: formItemId, form: { id: 1 }, order: 1 };
      const form = { id: 1, items: [{ order: 1 }] };

      formItemRepository.findOne.mockResolvedValue(formItem as FormItem);
      formRepository.findOne.mockResolvedValue(form as Form);
      entityManager.transaction.mockImplementation(async (isolationLevelOrRunInTransaction, maybeRunInTransaction) => {
        const runInTransaction = typeof isolationLevelOrRunInTransaction === 'function' ? isolationLevelOrRunInTransaction : maybeRunInTransaction;
        return runInTransaction(entityManager);
      });
      entityManager.save.mockResolvedValueOnce(form);
      entityManager.save.mockResolvedValueOnce(formItem);

      const result = await service.update(formItemId, updateFormItemDto, user);

      expect(formItemRepository.findOne).toHaveBeenCalledWith({
        where: { id: formItemId },
        relations: ['form'],
        select: { id: true, order: true, form: { id: true } },
      });
      expect(entityManager.save).toHaveBeenCalledWith(form);
      expect(entityManager.save).toHaveBeenCalledWith(formItem);
      expect(result).toEqual({ message: 'Form item updated successfully', payload: formItem });
    });

    it('should throw NotFoundException if form item is not found', async () => {
      formItemRepository.findOne.mockResolvedValue(null);

      await expect(service.update(1, {} as UpdateFormItemDto, { userId: 1 })).rejects.toThrow(NotFoundException);
    });
  });
});
