import { Test, TestingModule } from '@nestjs/testing';
import { FormResponseController } from './form-response.controller';
import { FormResponseService } from './form-response.service';
import { CreateFormResponseDto } from './dto/create-form-response.dto';

describe('FormResponseController', () => {
  let controller: FormResponseController;
  let service: FormResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormResponseController],
      providers: [
        {
          provide: FormResponseService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<FormResponseController>(FormResponseController);
    service = module.get<FormResponseService>(FormResponseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call formResponseService.create with correct parameters', async () => {
      const formId = '1';
      const createFormResponseDto: CreateFormResponseDto = {
        items: [
          {
            id: 1,
            value: 'value'
          }
        ]
      };
      const result = {
        message: 'Form response created successfully',
        payload: null
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(formId, createFormResponseDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(+formId, createFormResponseDto);
    });
  });
});