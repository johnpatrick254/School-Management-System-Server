import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PrismaService } from '../../src/database/database.service';

@Module({
  providers: [SectionService,PrismaService],
  controllers: [SectionController]
})
export class SectionModule {}
