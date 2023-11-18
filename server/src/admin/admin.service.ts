import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/database.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAdminById(id: string) {
    const admin  = await this.prisma.admin.findUnique({
      where: {
        id,
      },
      include: {
        permissions: {
          select: { id: true },
        },
      },
    });
     
    if(!admin) throw new NotFoundException('Admin does not exist');

    const {password,...adminData} = admin;
    return adminData;
  }
}
