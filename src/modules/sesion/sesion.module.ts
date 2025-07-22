import { Module } from '@nestjs/common';
import { SesionController } from './sesion.controller';
import { SesionService } from './sesion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SesionEntity } from 'src/models/Auth/sesion.entity';
import { UsuariosModule } from '../users/usuarios.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([SesionEntity]),
    UsuariosModule,
    JwtModule.register({
      secret: 'mi_clave_secreta',
      signOptions: { expiresIn: '2h' },
    })
  ],
  controllers: [SesionController],
  providers: [SesionService]
})
export class SesionModule {}
