import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAdminById(id: string) {
    const { password, ...admin } = await this.prisma.admin.findUnique({
      where: {
        id,
      },
      include: {
        permissions: {
          select: { id: true },
        },
      },
    });
    return admin;
  }
}
