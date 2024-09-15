import { IsEmail, IsNotEmpty } from "class-validator";
export class LogInAuthDto {
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}