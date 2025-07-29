import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Matches } from "class-validator";
import { RolEntity } from "src/models/Auth/rol.entity";

export class ActualizarUsuarioDto {

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

    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s/%]).{8,}$/, {
        message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (excepto / y %)',
    })
    contraseña?: string;

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
    rol_id: RolEntity;

    @IsBoolean()
    @IsOptional()
    habilitado_2fa?: boolean;

}