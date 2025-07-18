import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class PermisoDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

}