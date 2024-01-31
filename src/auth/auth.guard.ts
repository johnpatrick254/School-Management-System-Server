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
import { RequiredPermission } from '../auth/permision.decorator';
import { PermissionType } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req: Request = context.switchToHttp().getRequest();
    const requiredPermission = this.reflector.get(
      RequiredPermission,
      context.getHandler(),
    ) as Partial<PermissionType>;

    const token = req.cookies.session;

    if (isPublic) {
      if (requiredPermission) {
        if (!token) throw new UnauthorizedException('UNAUTHORIZED: Please provide access token in your request');
        return this.authService.validateUserPerms(requiredPermission, token);
      }
      return true;
    }

    if (!token) throw new UnauthorizedException("UNAUTHORIZED: Please provide access token in your request");
    this.authService.validateUser(token);
    if (requiredPermission) {
      return this.authService.validateUserPerms(requiredPermission, token);
    }

    return true;
  }
}
