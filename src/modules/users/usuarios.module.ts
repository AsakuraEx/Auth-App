import { forwardRef, Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/models/Auth/usuario.entity';
import { SesionModule } from '../sesion/sesion.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]), 
    forwardRef(()=>SesionModule)
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}
