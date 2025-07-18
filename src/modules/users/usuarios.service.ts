import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/models/rol.entity';
import { UsuarioEntity } from 'src/models/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(RolEntity) private rolRepository: Repository<RolEntity>
    ){}

    async getRoles(){
        return await this.rolRepository.find();
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

        const result = await this.usuarioRepository.save(user)
        return result;
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
            return {message: nuevoEstado ? 'Activo': 'Inactivo'}

        }catch(e){
            throw new InternalServerErrorException('Ocurrio un error al cambiar el estado del usuario');
        }
    

    }

    async searchById(id: string){

        return await this.usuarioRepository.findOne({
            where: { id: id }
        });

    }   

    //Busca a un usuario mediante su email
    async searchByEmail(email: string){

        return await this.usuarioRepository.findOne({
            where: { email: email }
        });

    }

    //Busca a un usuario mediante su documento
    async searchByDocumento(documento: string){

        return await this.usuarioRepository.findOne({
            where: { documento: documento }
        });

    }

    async searchByTelefono(telefono: string){

        return await this.usuarioRepository.findOne({
            where: { telefono: telefono }
        });

    }

}
