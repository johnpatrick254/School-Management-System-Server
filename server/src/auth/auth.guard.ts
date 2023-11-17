import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './publicroute.decorator';
import { extractBearerToken } from './Util/extracttoken.util';
import { RequiredPermission } from 'src/auth/permision.decorator';
import { PrismaService } from 'src/database/database.service';
import { PermissionType } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
    private readonly prisma: PrismaService
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req: Request = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    const requiredPermission = this.reflector.get(RequiredPermission, context.getHandler()) as Partial<PermissionType>
    const token = extractBearerToken(authorization);
    if (!token) throw new UnauthorizedException();

    if (isPublic) {
      if (requiredPermission) {
        return this.authService.validateUserPerms(requiredPermission,token);  
      }
      return true;
    }
   
    this.authService.validateUser(token);
    if (requiredPermission) {
      return this.authService.validateUserPerms(requiredPermission,token);  
    }

    return true;
  }
}
