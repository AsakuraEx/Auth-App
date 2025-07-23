import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from 'src/models/Auth/rol.entity';
import { PermisoEntity } from 'src/models/Auth/permiso.entity';
import { SesionModule } from '../sesion/sesion.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity, PermisoEntity]), SesionModule],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
