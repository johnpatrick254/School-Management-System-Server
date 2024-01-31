import { Reflector } from '@nestjs/core';
import { PermissionType } from '@prisma/client';
export const RequiredPermission = Reflector.createDecorator<PermissionType>();