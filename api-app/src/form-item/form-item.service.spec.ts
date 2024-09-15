import { Test, TestingModule } from '@nestjs/testing';
import { FormItemService } from './form-item.service';

describe('FormItemService', () => {
  let service: FormItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormItemService],
    }).compile();

    service = module.get<FormItemService>(FormItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
