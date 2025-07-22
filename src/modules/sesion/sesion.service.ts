import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SesionEntity } from 'src/models/Auth/sesion.entity';
import { Repository } from 'typeorm';
import { UsuariosService } from '../users/usuarios.service';
import { CredencialesDto } from '../users/dto/credenciales.dto';
import { JwtService } from '@nestjs/jwt';
import { SesionDto } from './dto/sesion.dto';
import { UsuarioDto } from '../users/dto/usuario.dto';

@Injectable()
export class SesionService {

    constructor(
        @InjectRepository(SesionEntity) private sesionRepository: Repository<SesionEntity>,
        private usuarioService: UsuariosService,
        private jwtService: JwtService
    ) {}


    async getSesionByUsuario(id: string){

        return this.sesionRepository.findOne({
            where: {id_usuario: {id: id}},
            relations: ['id_usuario'],
        })

    }

    async crearSesion(credenciales: CredencialesDto) {
        
        if(await this.usuarioService.validarUsuario(credenciales)){

            try {
                const usuario: UsuarioDto | null = await this.usuarioService.searchByEmail(credenciales.email);
    
                if(usuario){
    
                    if(usuario.id){
                        const existeSesion = await this.getSesionByUsuario(usuario.id)
                        
                        if(existeSesion){
                            if(existeSesion.id){   
                                await this.eliminarSesion(existeSesion.id)
                            }
                        }

                    }
                        
                    const sesion = await this.crearToken(usuario)
                       
                    await this.sesionRepository.save(sesion)

                    return {
                        token: sesion.token,
                        expiracion: sesion.expiracion
                    }
                }
    
            }catch(e){
                throw new InternalServerErrorException('Error desconocido del servidor')
            }

        }

        throw new UnauthorizedException()
    }

    async eliminarSesion(id: number){

        await this.sesionRepository.delete(id)

    }

    async crearToken(usuario: any){

        const payload = { 
            id: usuario.id, 
            email: usuario.email, 
            nombre: usuario.nombre, 
            apellido: usuario.apellido, 
            activo: usuario.activo, 
            habilitado_2fa: usuario.habilitado_2fa 
        }
            
        const token = await this.jwtService.signAsync(payload);

        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() + 2)


        const sesion: SesionDto = {
            token: token,
            expiracion: fechaActual,
            id_usuario: usuario,
        }

        return sesion

    }

}
