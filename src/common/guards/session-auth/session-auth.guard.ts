import { 
  CanActivate, 
  ExecutionContext, 
  Injectable, 
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { SesionService } from 'src/modules/sesion/sesion.service';

@Injectable()
export class SessionAuthGuard implements CanActivate {

  constructor(private readonly sesionService: SesionService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if(!authHeader){
      throw new UnauthorizedException('No se ha proporcionado un token');
    }

    const token = authHeader.replace('Bearer ', '');

    const sesionValida = await this.sesionService.validarSesion(token);

    if(!sesionValida){
      await this.sesionService.eliminarSesion(token)
      throw new UnauthorizedException('La sesion ha expirado o es invalida');
    }
    
    return true;
  }

}

