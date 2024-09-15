import { Test, TestingModule } from '@nestjs/testing';
import { FormItemController } from './form-item.controller';
import { FormItemService } from './form-item.service';

describe('FormItemController', () => {
  let controller: FormItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormItemController],
      providers: [FormItemService],
    }).compile();

    controller = module.get<FormItemController>(FormItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
