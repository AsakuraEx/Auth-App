import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/users/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './models/usuario.entity';
import { RolEntity } from './models/rol.entity';

@Module({
  imports: [UsuariosModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.1.35',
      port: 5432,
      username: 'francisco',
      password: 'Pokeluchos2.',
      database: 'AuthUsers',
      entities: [UsuarioEntity, RolEntity],
      synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
