import { Body, Controller, Post } from '@nestjs/common';
import { SesionService } from './sesion.service';
import { CredencialesDto } from '../users/dto/credenciales.dto';

@Controller('api/v1/sesiones')
export class SesionController {

    constructor(private sesionService: SesionService){}

    @Post()
    async obtenerUsuarios(@Body() credenciales: CredencialesDto){ 
        return await this.sesionService.crearSesion(credenciales)
    }


}
