import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolDto } from './dto/rol.dto';

@Controller('api/v1/roles')
export class RolesController {

    constructor(private rolService: RolesService){}

    @Get()
    getRoles(){
        return this.rolService.getRoles();
    }

    @Get()
    getPermisos(){
        return this.rolService.getPermisos();
    }

    @Get('permisos/config/:id')
    getRolesPermisos(@Param('id') id: number){
        return this.rolService.getRolesPermisosById(id);
    }

    @Post()
    crearRol(@Body() rol: RolDto){
        return this.rolService.createRol(rol)
    }
    
    @Put()
    updateRol(@Body() rol: RolDto){
        return this.rolService.updateRol(rol)
    }

}
