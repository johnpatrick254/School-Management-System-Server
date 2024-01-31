import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { PrismaService } from '../src/database/database.service';

@Module({
  controllers: [StatsController],
  providers: [StatsService,PrismaService]
})
export class StatsModule {}
