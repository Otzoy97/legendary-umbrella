import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


class FormResponseItemDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  value: string;
}

export class CreateFormResponseDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FormResponseItemDto)
  items: FormResponseItemDto[]
}

