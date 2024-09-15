import { Test, TestingModule } from '@nestjs/testing';
import { FormResponseItemController } from './form-response-item.controller';
import { FormResponseItemService } from './form-response-item.service';

describe('FormResponseItemController', () => {
  let controller: FormResponseItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormResponseItemController],
      providers: [FormResponseItemService],
    }).compile();

    controller = module.get<FormResponseItemController>(FormResponseItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
