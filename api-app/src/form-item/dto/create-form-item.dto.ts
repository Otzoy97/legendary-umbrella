import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export enum FormItemType {
  TEXT = 'text',
  NUMBER = 'number',
  MULTIPLE = 'multiple',
  DATE = 'date',
  SINGLE = 'single',
}

export class CreateFormItemDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  required: boolean;

  @IsEnum(FormItemType)
  type: FormItemType;

  @IsString()
  @IsOptional()
  options: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  order: number;
}