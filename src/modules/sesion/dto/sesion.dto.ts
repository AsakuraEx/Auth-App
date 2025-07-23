import { IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsPositive, IsString } from "class-validator";
import { UsuarioEntity } from "src/models/Auth/usuario.entity";

export class SesionDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    token!: string;

    @IsString()
    @IsOptional()
    refresh_token?: string;

    @IsDate()
    @IsOptional()
    expiracion?: Date;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;

    @IsObject()
    @IsNotEmptyObject()
    id_usuario!: UsuarioEntity

    @IsString()
    @IsOptional()
    two_secret_password?: string;

}