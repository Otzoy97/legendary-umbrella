import { PartialType } from '@nestjs/mapped-types';
import { CreateFormResponseItemDto } from './create-form-response-item.dto';

export class UpdateFormResponseItemDto extends PartialType(CreateFormResponseItemDto) {}
