import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PermisoDto } from "./permiso.dto";
import { Type } from "class-transformer";

export class RolDto {
    @IsPositive()
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @ArrayNotEmpty()
    @Type(()=>PermisoDto)
    permisos!: PermisoDto[];

}