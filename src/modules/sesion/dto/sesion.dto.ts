import { IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsPositive, IsString } from "class-validator";
import { UsuarioEntity } from "src/models/Auth/usuario.entity";

export class SesionDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    token!: string;

    @IsBoolean()
    @IsOptional()
    refresh_token?: boolean;

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