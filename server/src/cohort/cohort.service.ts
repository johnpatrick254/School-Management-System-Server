import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class CohortService {
  constructor(readonly prisma: PrismaService) {}
}
