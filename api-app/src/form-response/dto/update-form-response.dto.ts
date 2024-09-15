import { PartialType } from '@nestjs/mapped-types';
import { CreateFormResponseDto } from './create-form-response.dto';

export class UpdateFormResponseDto extends PartialType(CreateFormResponseDto) {}
