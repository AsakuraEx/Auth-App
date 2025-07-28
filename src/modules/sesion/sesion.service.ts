import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
                            await this.eliminarSesion(existeSesion.token)
                        }

                    }
                        
                    const sesion: SesionDto = await this.crearToken(usuario)
                       
                    await this.sesionRepository.save(sesion)

                    return {
                        token: sesion.token,
                        refresh_token: sesion.refresh_token
                    }
                }
    
            }catch(e){
                throw new InternalServerErrorException('Error desconocido del servidor')
            }

        }

        throw new UnauthorizedException('El usuario al que intenta acceder no existe')
    }

    async eliminarSesion(token: string){

        const sesion = await this.sesionRepository.findOne({
            where: {token: token}
        })

        if(!sesion){
            throw new NotFoundException('No hay una sesión activa')
        }

        if(sesion.id){
            await this.sesionRepository.delete(sesion.id)
        }

    }

    async crearToken(usuario: any){

        const payload = { 
            id: usuario.id, 
            email: usuario.email, 
            nombre: usuario.nombre, 
            apellido: usuario.apellido, 
            activo: usuario.activo, 
            habilitado_2fa: usuario.habilitado_2fa,
            rol_id: usuario.rol_id.id
        }
            
        const token = await this.jwtService.signAsync(payload, {expiresIn: '1m'});

        const fechaActual = new Date();
        const expiracion = new Date(fechaActual.getTime() + 2 * 60 * 60 * 1000)

        const refresh_token = await this.crearRefreshToken(usuario.id)

        const sesion: SesionDto = {
            token: token,
            expiracion: expiracion,
            id_usuario: usuario,
            refresh_token: refresh_token
        }

        return sesion

    }

    async crearRefreshToken(id: number){

        const payload = {
            id_usuario: id
        }

        const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '2m'})

        return refresh_token;

    }

    async validarSesion(token: string){
        const sesion = await this.sesionRepository.findOne({
            where: { token },
            relations: ['id_usuario']
        })

        if(!sesion) return null;

        const fechaActual = Date.now();
        const fechaExpiracion = sesion.expiracion.getTime();

        if(fechaActual > fechaExpiracion){
            return null
        }
        return sesion;
    }

    async obtenerNuevoToken(refresh_token: string){

        const payload = await this.jwtService.verifyAsync(refresh_token);

        const sesionActual = await this.getSesionByUsuario(payload.id_usuario);

        if(!sesionActual){
            throw new NotFoundException('No se puede renovar la sesión porque el usuario no posee una sesión registrada')
        }

        if(sesionActual.refresh_token !== refresh_token){
            throw new UnauthorizedException('El refresh_token no coincide')
        }
            
        const usuario = await this.usuarioService.searchById(payload.id_usuario);
        
        const sesion = await this.crearToken(usuario)


        await this.sesionRepository.update(
            {id_usuario: payload.id_usuario},
            {
                token: sesion.token,
                refresh_token: sesion.refresh_token,
                expiracion: new Date(Date.now() + 8 *60 * 60 * 1000)
            }
        )
        
        return {
            token: sesion.token,
            expiracion: sesion.expiracion
        };
        
    }

}
