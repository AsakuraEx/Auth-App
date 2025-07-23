import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuario.dto';
import { CredencialesDto } from './dto/credenciales.dto';
import { SessionAuthGuard } from 'src/common/guards/session-auth/session-auth.guard';

@Controller('api/v1/usuarios')
@UseGuards(SessionAuthGuard)
export class UsuariosController {

    constructor(private userService: UsuariosService){}

    @Get()
    getUsuarios(){
        return this.userService.getUsuarios()
    }

    @Post()
    createUsuarios(@Body() usuario: UsuarioDto){
        return this.userService.createUsuarios(usuario)
    }

    @Put()
    updateUsuarios(@Body() usuario: UsuarioDto){
        return this.userService.updateUsuarios(usuario)
    }

    @Post('/auth')
    validarUsuario(@Body() credenciales: CredencialesDto){
        return this.userService.validarUsuario(credenciales)
    }

    @Patch('/estado/:id')
    switchActivo(@Param('id') id: string){
        return this.userService.switchActivo(id)
    }


}
