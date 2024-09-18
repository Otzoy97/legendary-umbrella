import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateFormDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    description: string;
}
