import { PartialType } from '@nestjs/mapped-types';
import { CreateFormItemDto } from './create-form-item.dto';

export class UpdateFormItemDto extends PartialType(CreateFormItemDto) {}
