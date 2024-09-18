import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FormResponseService } from './form-response.service';
import { FormResponse } from './entities/form-response.entity';
import { Form } from '../form/entities/form.entity';
import { FormResponseItem } from './entities/form-response-item.entity';
import { EntityManager, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateFormResponseDto } from './dto/create-form-response.dto';

describe('FormResponseService', () => {
  let service: FormResponseService;
  let formResponseRepository: Repository<FormResponse>;
  let formRepository: Repository<Form>;
  let formResponseItemRepository: Repository<FormResponseItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormResponseService,
        {
          provide: getRepositoryToken(FormResponse),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Form),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(FormResponseItem),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FormResponseService>(FormResponseService);
    formResponseRepository = module.get<Repository<FormResponse>>(getRepositoryToken(FormResponse));
    formRepository = module.get<Repository<Form>>(getRepositoryToken(Form));
    formResponseItemRepository = module.get<Repository<FormResponseItem>>(getRepositoryToken(FormResponseItem));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('formResponseRepository should be defined', () => {
    expect(formResponseRepository).toBeDefined();
  });

  it('formRepository should be defined', () => {
    expect(formRepository).toBeDefined();
  });

  it('formResponseItemRepository should be defined', () => {
    expect(formResponseItemRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should retrieve paginated form responses', async () => {
      const formResponses = [{ id: 1 }] as FormResponse[];
      jest.spyOn(formResponseRepository, 'findAndCount').mockResolvedValue([formResponses, 1]);

      const query = { page: 1, pageSize: 10, formId: 1 };
      const result = await service.findAll(query);

      expect(result).toEqual({
        message: 'Form responses retrieved successfully',
        payload: { data: formResponses, total: 1 },
      });
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if form response does not exist', async () => {
      jest.spyOn(formResponseRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });

    it('should retrieve a form response successfully', async () => {
      const formResponse = { id: 1 } as FormResponse;
      jest.spyOn(formResponseRepository, 'findOne').mockResolvedValue(formResponse);

      const result = await service.findOne(1);
      expect(result).toEqual({ message: 'Form response retrieved successfully', payload: formResponse });
    });
  });
});