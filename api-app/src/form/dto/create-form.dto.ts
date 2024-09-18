import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateFormDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}
