import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuario.dto';

@Controller('api/v1/usuarios')
export class UsuariosController {

    constructor(private userService: UsuariosService){}

    @Post()
    createUsuarios(@Body() usuario: UsuarioDto){
        return this.userService.createUsuarios(usuario)
    }

    @Get('/roles')
    getRoles(){
        return this.userService.getRoles();
    }

    @Patch('/estado/:id')
    switchActivo(@Param('id') id: string){
        return this.userService.switchActivo(id)
    }

}
