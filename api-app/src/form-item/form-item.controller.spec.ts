import { Test, TestingModule } from '@nestjs/testing';
import { FormItemController } from './form-item.controller';
import { FormItemService } from './form-item.service';

describe('FormItemController', () => {
  let controller: FormItemController;
  let service: FormItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormItemController],
      providers: [
        {
          provide: FormItemService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FormItemController>(FormItemController);
    service = module.get<FormItemService>(FormItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have FormItemService instance', () => {
    expect(controller['formItemService']).toBe(service);
  });
});