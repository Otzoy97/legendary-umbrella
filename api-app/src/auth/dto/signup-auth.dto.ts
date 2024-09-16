import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class LogInAuthDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}