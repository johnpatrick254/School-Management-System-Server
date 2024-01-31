import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { CreateCohortDTO } from './DTO/createcohort.dto';
import { UpdateCohortDTO } from './DTO/updatecohort.dto';
import { Cohort } from '@prisma/client';
import { logger } from '../lib/logger';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CohortService {
  constructor(readonly prisma: PrismaService) {}

  @Cron('0 0 1 1 *', {
    name: 'create_cohorts_annually',
  })
  async createCohortAutomatically() {
    const careers = await this.prisma.career.findMany({
      select: {
        id: true,
        code: true,
      },
    });
    const year = new Date().getFullYear();
    if (careers.length) {
      careers.map(async (career) => {
        const newCohort = await this.prisma.cohort.create({
          data: {
            code: `${career.code}-${year}`,
            year: year,
            career: {
              connect: {
                id: career.id,
              },
            },
          },
        });
        logger.verbose(
          '[create_cohorts_annually]:NEW ANNUAL COHORT:',
          newCohort,
        );
      });
    }
  }

  async create(data: CreateCohortDTO): Promise<Cohort> {
    try {
      const cohort = await this.prisma.cohort.create({
        data,
      });
      return cohort;
    } catch (error) {
      logger.error(error);
      if (error.code === 'P2002')
        throw new ConflictException('cohort already exist');
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, data: Pick<UpdateCohortDTO, 'careerId' | 'code'>) {
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
      take: +limit,
    });

    return cohorts;
  }

  async delete(id: string) {
    const deleted = await this.prisma.cohort.findUnique({ where: { id } });
    if (!deleted) throw new NotFoundException('cohort not found');
    await this.prisma.cohort.delete({ where: { id } });
  }
}
