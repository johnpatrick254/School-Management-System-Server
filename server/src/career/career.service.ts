import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Career } from '@prisma/client';
import { CreateCareerDTO } from './DTO/createcareer.dto';
import { logger } from '../lib/logger';
import { UpdateCareerDTO } from './DTO/updatecareer.dto';
import { PrismaService } from '../database/database.service';

@Injectable()
export class CareerService {
  constructor(readonly prisma: PrismaService) {}

  async create(data: CreateCareerDTO): Promise<Career> {
    try {
      const career = await this.prisma.career.create({
        data,
      });
      return career;
    } catch (error) {
      logger.error(error);
      if (error.code === 'P2002')
        throw new ConflictException('career already exist');
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    data: Pick<UpdateCareerDTO, 'code' | 'name' | 'cost'>,
  ) {
    const updatedCareer = await this.prisma.career.update({
      data,
      where: { id },
    });

    if (!updatedCareer) throw new NotFoundException('career not found');

    return updatedCareer;
  }

  async getCareerById(id: string) {
    const career = await this.prisma.career.findUnique({
      where: { id },
    });
    if (!career) throw new NotFoundException('career not found');
    return career;
  }

  async getCareers(limit: number): Promise<Career[]> {
    const careers = await this.prisma.career.findMany({
      take: limit,
    });

    return careers;
  }

  async delete(id: string) {
    const deleted = await this.prisma.career.delete({ where: { id } });
    if (!deleted) throw new NotFoundException('career not found');
  }
}
