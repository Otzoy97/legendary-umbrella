import { Test, TestingModule } from '@nestjs/testing';
import { FormResponseItemService } from './form-response-item.service';

describe('FormResponseItemService', () => {
  let service: FormResponseItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormResponseItemService],
    }).compile();

    service = module.get<FormResponseItemService>(FormResponseItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
