import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class NewClient {

        @IsOptional()
        @IsNumber()
        @IsPositive()
        id?: number;
    
        @IsString()
        @IsNotEmpty()
        nombreCliente!: string;

        @IsString()
        @IsNotEmpty()
        servidor!: string;
    
        @IsString()
        @IsNotEmpty()
        contraseñaCliente!: string;
    
        @IsString()
        @IsBoolean()
        token?: string;
    
        @IsOptional()
        @IsBoolean()
        habilitado?: boolean;
}