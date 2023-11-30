import { Module } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CohortController } from './cohort.controller';

@Module({
  providers: [CohortService],
  controllers: [CohortController],
})
export class CohortModule {}
