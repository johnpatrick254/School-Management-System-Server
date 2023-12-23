import { Module } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CohortController } from './cohort.controller';
import { PrismaService } from 'src/database/database.service';

@Module({
  providers: [CohortService,PrismaService],
  controllers: [CohortController],
})
export class CohortModule {}
