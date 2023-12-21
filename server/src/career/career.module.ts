import { Module } from '@nestjs/common';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';

@Module({
  controllers: [CareerController],
  providers: [CareerService]
})
export class CareerModule {}
