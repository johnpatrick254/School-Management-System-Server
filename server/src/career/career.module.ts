import { Module } from '@nestjs/common';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';
import { PrismaService } from 'src/database/database.service';

@Module({
  controllers: [CareerController],
  providers: [CareerService, PrismaService],
})
export class CareerModule {}
