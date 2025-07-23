import { Body, Controller, Post } from '@nestjs/common';
import { SesionService } from './sesion.service';
import { CredencialesDto } from '../users/dto/credenciales.dto';

@Controller('api/v1/sesiones')
export class SesionController {

    constructor(private sesionService: SesionService){}

    @Post()
    async crearSesion(@Body() credenciales: CredencialesDto){ 
        return await this.sesionService.crearSesion(credenciales)
    }

    @Post('/refresh')
    obtenerNuevoToken(@Body('token') token: string){
        return this.sesionService.obtenerNuevoToken(token)
    }


}
