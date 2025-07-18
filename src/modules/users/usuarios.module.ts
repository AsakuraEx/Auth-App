import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/models/usuario.entity';
import { RolEntity } from 'src/models/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, RolEntity])],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
