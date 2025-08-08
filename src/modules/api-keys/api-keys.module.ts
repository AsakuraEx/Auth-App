import { Module } from '@nestjs/common';
import { ApiKeysController } from './api-keys.controller';
import { ApiKeysService } from './api-keys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteApiEntity } from 'src/models/api_keys/cliente_api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteApiEntity])],
  controllers: [ApiKeysController],
  providers: [ApiKeysService]
})
export class ApiKeysModule {}
