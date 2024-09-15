import { Test, TestingModule } from '@nestjs/testing';
import { FormResponseService } from './form-response.service';

describe('FormResponseService', () => {
  let service: FormResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormResponseService],
    }).compile();

    service = module.get<FormResponseService>(FormResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
