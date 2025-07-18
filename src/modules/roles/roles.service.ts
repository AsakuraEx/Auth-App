import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermisoEntity } from 'src/models/Auth/permiso.entity';
import { RolEntity } from 'src/models/Auth/rol.entity';
import { Repository } from 'typeorm';
import { RolDto } from './dto/rol.dto';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(RolEntity) private rolRepository: Repository<RolEntity>,
        @InjectRepository(PermisoEntity) private permisoRepository: Repository<PermisoEntity>
    ){}

    async getRoles(){
        return await this.rolRepository.find();
    }

    async getRolesById(id: number){
        return await this.rolRepository.findOne({
            where: {id: id},
        })
    }

    async getRolesPermisosById(id: number){
        return await this.rolRepository.findOne({
            where: {id: id},
            relations: ['permisos'],
        })
    }

    async getPermisos(){
        return await this.permisoRepository.find();
    }

    async getPermisosById(id: number) {
        return await this.permisoRepository.findOne({
            where: {id: id}
        })
    }

    async createRol(rol: RolDto) {
        
        let valorBuscado;

        for(const permiso of rol.permisos){

            if(permiso.id){

                valorBuscado = await this.getPermisosById(permiso.id);
                if(!valorBuscado){
                    throw new ConflictException('El permiso que ha proporcionado no existe');
                }

            }
        }

        return this.rolRepository.save(rol);

    }

}
