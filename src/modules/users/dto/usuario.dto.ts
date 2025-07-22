import { IsBoolean, IsDate, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsPositive, IsString, isString, IsUUID, Matches } from "class-validator";

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
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s/%]).{8,}$/, {
        message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (excepto / y %)',
    })
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

    @IsBoolean()
    @IsOptional()
    habilitado_2fa?: boolean;

}