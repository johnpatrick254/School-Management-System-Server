import {
  Body,
  ConflictException,
  Get,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { CreateCohortDTO } from './DTO/createcohort.dto';
import { UpdateCohortDTO } from './DTO/updatecohort.dto';
import { Cohort } from '@prisma/client';
import { logger } from 'src/lib/logger';

@Injectable()
export class CohortService {
  constructor(readonly prisma: PrismaService) {}

  async create(data: CreateCohortDTO): Promise<Cohort> {
    try {
      const cohort = await this.prisma.cohort.create({
        data,
      });
      return cohort;
    } catch (error) {
      logger.error(error)
      if (error.code === 'P2002')
        throw new ConflictException('cohort already exist');
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    data: Pick<UpdateCohortDTO, 'careerId' | 'code' | 'name'>,
  ) {
    const updatedCohort = await this.prisma.cohort.update({
      data,
      where: { id },
    });

    if (!updatedCohort) throw new NotFoundException('cohort not found');

    return updatedCohort;
  }

  async getCohortById(id: string) {
    const cohort = await this.prisma.cohort.findUnique({
      where: { id },
    });
    if (!cohort) throw new NotFoundException('cohort not found');
    return cohort;
  }

  async getCohorts(limit: number): Promise<Cohort[]> {
    const cohorts = await this.prisma.cohort.findMany({
      take: limit,
    });

    return cohorts;
  }

  async delete(id: string) {
    const deleted = await this.prisma.cohort.delete({ where: { id } });
    if (!deleted) throw new NotFoundException('cohort not found');
  }
}
