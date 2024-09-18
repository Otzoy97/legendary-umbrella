import { Test, TestingModule } from '@nestjs/testing';
import { FormService } from './form.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

describe('FormService', () => {
  let service: FormService;
  let repository: Repository<Form>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormService,
        {
          provide: getRepositoryToken(Form),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FormService>(FormService);
    repository = module.get<Repository<Form>>(getRepositoryToken(Form));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new form', async () => {
      const createFormDto: CreateFormDto = { name: 'Test Form', description: null };
      const user = { userId: 1 };
      const savedForm = { id: 1, ...createFormDto, createdBy: user.userId, updatedBy: user.userId };

      jest.spyOn(repository, 'save').mockResolvedValue(savedForm as unknown as Form);

      const result = await service.create(createFormDto, user);
      expect(result).toEqual({ message: 'Form created successfully', payload: savedForm });
    });
  });

  describe('findAll', () => {
    it('should retrieve paginated forms', async () => {
      const query = { page: 1, pageSize: 10 };
      const forms = [{ id: 1, title: 'Test Form' }];
      const total = 1;

      jest.spyOn(repository, 'findAndCount').mockResolvedValue([forms as unknown as Form[], total]);

      const result = await service.findAll(query);
      expect(result).toEqual({ message: 'Forms retrieved successfully', payload: { data: forms, total } });
    });
  });

  describe('findOne', () => {
    it('should retrieve a form by id', async () => {
      const form = { id: 1, title: 'Test Form' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(form as unknown as Form);

      const result = await service.findOne(1);
      expect(result).toEqual({ message: 'Form retrieved successfully', payload: form });
    });

    it('should throw NotFoundException if form not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a form by id', async () => {
      const updateFormDto: UpdateFormDto = { name: 'Updated Form' };
      const user = { userId: 1 };
      const updateResult = { affected: 1 };

      jest.spyOn(repository, 'update').mockResolvedValue(updateResult as any);

      const result = await service.update(1, updateFormDto, user);
      expect(result).toEqual({ message: 'Form updated successfully' });
    });

    it('should throw NotFoundException if form not found', async () => {
      const updateFormDto: UpdateFormDto = { name: 'Updated Form' };
      const user = { userId: 1 };
      const updateResult = { affected: 0 };

      jest.spyOn(repository, 'update').mockResolvedValue(updateResult as any);

      await expect(service.update(1, updateFormDto, user)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a form by id', async () => {
      const form = { id: 1, title: 'Test Form' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(form as unknown as Form);
      jest.spyOn(repository, 'remove').mockResolvedValue(form as any);

      const result = await service.remove(1);
      expect(result).toEqual({ message: 'Form deleted successfully' });
    });

    it('should throw NotFoundException if form not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
