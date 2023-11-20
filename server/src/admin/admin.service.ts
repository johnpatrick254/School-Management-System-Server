import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { UpdateAdminDTO } from './DTO/update-admin.dto';

import { Admin } from '@prisma/client';
import { UpdatePasswordDTO } from '../core/DTO/update-password.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAdminById(id: string) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
      },
      include: {
        permissions: {
          select: { id: true },
        },
      },
    });

    if (!admin) throw new NotFoundException('Admin does not exist');

    const { password, ...adminData } = admin;
    return adminData;
  }

  async getAdmins(limit: number): Promise<Partial<Admin>[]> {
    const admins = await this.prisma.admin.findMany({
      take: limit,
      select: { password: false },
    });
    return admins;
  }

  async update(data: UpdateAdminDTO) {
    const { id, ...adminData } = data;
    const adminUpdated = await this.prisma.admin.update({
      where: { id },
      data: adminData,
    });
    if (!adminUpdated) throw new NotFoundException('Admin does not exist');
    const { password, ...adminUpdatedWithoutPass } = adminUpdated;
    return adminUpdatedWithoutPass;
  }

  async updatePassword(data: UpdatePasswordDTO) {
    const { id, password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      throw new HttpException(
        'Password does not match',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const currentAdmin = await this.prisma.admin.findUnique({ where: { id } });

    if (!currentAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    await this.prisma.admin.update({
      where: {
        id: data.id,
      },
      data: {
        password,
      },
    });
  }

  async delete(id: string) {
    const admin = await this.prisma.admin.delete({ where: { id } });

    if (!admin) throw new NotFoundException('Admin does not exist');
  }
}
