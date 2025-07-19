import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CredencialesDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    contraseña: string;

}