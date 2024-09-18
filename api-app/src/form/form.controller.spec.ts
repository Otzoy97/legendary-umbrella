import { Test, TestingModule } from '@nestjs/testing';
import { FormController } from './form.controller';
import { FormService } from './form.service';

describe('FormController', () => {
  let formController: FormController;
  let formService: FormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormController],
      providers: [
        {
          provide: FormService,
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

    formService = module.get<FormService>(FormService);
    formController = module.get<FormController>(FormController);
  });

  it('should be defined', () => {
    expect(formController).toBeDefined();
  });

  it('should have formService defined', () => {
    expect(formController['formService']).toBeDefined();
    expect(formController['formService']).toBe(formService);
  });
});
