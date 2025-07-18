import { IsBoolean, IsDate, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsPositive, IsString, isString, IsUUID } from "class-validator";

export class UsuarioDto {

    @IsOptional()
    @IsUUID()
    id?: string;

    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    apellido!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    documento!: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsString()
    @IsNotEmpty()
    contraseña!: string;

    @IsBoolean()
    @IsOptional()
    activo?: boolean;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    updatedAt: Date;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    rol_id: number;


}