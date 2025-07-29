import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/users/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './models/Auth/usuario.entity';
import { RolEntity } from './models/Auth/rol.entity';
import { RolesModule } from './modules/roles/roles.module';
import { PermisoEntity } from './models/Auth/permiso.entity';
import { SesionModule } from './modules/sesion/sesion.module';
import { SesionEntity } from './models/Auth/sesion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: '192.168.1.35',
        port: 5432,
        username: 'postgres',
        password: 'Pokeluchos2.',
        database: 'AuthUsers',
        entities: [
          UsuarioEntity, RolEntity, PermisoEntity, SesionEntity
        ],
        synchronize: true,
      }
    ),
    UsuariosModule, 
    RolesModule, 
    SesionModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
