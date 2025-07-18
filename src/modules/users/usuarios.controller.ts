import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuario.dto';

@Controller('api/v1/usuarios')
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

    @Patch('/estado/:id')
    switchActivo(@Param('id') id: string){
        return this.userService.switchActivo(id)
    }

}
