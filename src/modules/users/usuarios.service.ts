import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/models/Auth/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioDto } from './dto/usuario.dto';
import * as bcrypt from 'bcrypt';
import { CredencialesDto } from './dto/credenciales.dto';
import { ActualizarUsuarioDto } from './dto/actualizarUsuario.dto';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
    ){}

    async getUsuarios(){
        return await this.usuarioRepository.find({
            relations: ['rol_id'],
            order: {
                rol_id: {
                    id: 'ASC'
                }
            }
        });
    }

    async createUsuarios(user: UsuarioDto) {

        let usuarioExiste = await this.searchByEmail(user.email)
        if(usuarioExiste){
            throw new ConflictException('El email ya fue registrado para otro usuario');
        }

        usuarioExiste = await this.searchByDocumento(user.documento)
        if(usuarioExiste){
            throw new ConflictException('El documento ya fue registrado para otro usuario');
        }

        if(user.telefono){
            usuarioExiste = await this.searchByTelefono(user.telefono)
            if(usuarioExiste){
                throw new ConflictException('El telefono ya fue registrado para otro usuario');
            }
        }

        const saltOrRounds = 10;

        const hashedPassword = await bcrypt.hash(user.contraseña, saltOrRounds)

        user.contraseña = hashedPassword;

        const result = await this.usuarioRepository.save(user)
        return result;
    }

    async updateUsuarios(usuario: ActualizarUsuarioDto){

        if(usuario.id){

            //Se busca que el usuario no ingrese un correo ya existente o el mismo
            let usuarioExiste: any = await this.searchByEmail(usuario.email);
            if(usuarioExiste && usuario.id !== usuarioExiste.id){
                throw new ConflictException('El email ya fue registrado para otro usuario');
            }

            usuarioExiste = await this.searchByDocumento(usuario.documento)
            if(usuarioExiste && usuario.id !== usuarioExiste.id){
                throw new ConflictException('El documento ya fue registrado para otro usuario');
            }
            if(usuario.telefono){
                usuarioExiste = await this.searchByTelefono(usuario.telefono)
                if(usuarioExiste && usuario.id !== usuarioExiste.id){
                    throw new ConflictException('El telefono ya fue registrado para otro usuario');
                }
            }

            if(usuario.contraseña){
                const saltOrRounds = 10;
                const hashedPassword = await bcrypt.hash(usuario.contraseña, saltOrRounds)
                usuario.contraseña = hashedPassword;
            }

            const result = await this.usuarioRepository.save(usuario)
            return result;

        }else{
            throw new NotFoundException('No se proporcionó un id de usuario')
        }

    }

    async switchActivo(id: string){

        if(!id){
            throw new BadRequestException('Debe proporcionar el id del usuario')
        }

        let usuarioBuscado: any = await this.searchById(id);

        if(!usuarioBuscado){
            throw new NotFoundException('El usuario no existe')
        }

        const nuevoEstado = !usuarioBuscado.activo;
            
        try {
            await this.usuarioRepository.update(
                { id },
                { activo: nuevoEstado}
            );
            return this.getUsuarios()

        }catch(e){
            throw new InternalServerErrorException('Ocurrio un error al cambiar el estado del usuario');
        }
    

    }

    async searchById(id: string){

        return await this.usuarioRepository.findOne({
            where: { id: id },
            relations: ['rol_id']
        });

    }   

    //Busca a un usuario mediante su email
    async searchByEmail(email: string){

        return await this.usuarioRepository.findOne({
            where: { email: email },
            relations: ['rol_id']
        });

    }

    //Busca a un usuario mediante su documento
    async searchByDocumento(documento: string){

        return await this.usuarioRepository.findOne({
            where: { documento: documento }
        });

    }

    async searchByTelefono(telefono: string) {

        return await this.usuarioRepository.findOne({
            where: { telefono: telefono }
        });

    }

    async validarUsuario(credenciales: CredencialesDto){

        const usuario: UsuarioDto | null = await this.searchByEmail(credenciales.email);

        if(!usuario){
            return false
        }

        const contraseñasIguales = await bcrypt.compare(credenciales.contraseña, usuario.contraseña);

        if(!contraseñasIguales){
            throw new UnauthorizedException('Las credenciales son invalidas')
        }

        return true

    }

}
