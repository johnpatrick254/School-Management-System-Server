import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCohortDTO } from './DTO/createcohort.dto';
import { Cohort } from '@prisma/client';
import { CohortService } from './cohort.service';
import { UpdateCohortDTO } from './DTO/updatecohort.dto';
import { RequiredPermission } from '../auth/permision.decorator';

@Controller('cohort')
export class CohortController {
  constructor(private service: CohortService) {}

  @RequiredPermission('EDIT_COHORT')
  @Post()
  async create(data: CreateCohortDTO): Promise<Cohort> {
    return this.service.create(data);
  }

  @RequiredPermission('EDIT_COHORT')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Pick<UpdateCohortDTO, 'careerId' | 'code' | 'name'>,
  ): Promise<Cohort> {
    return this.service.update(id, data);
  }

  @RequiredPermission('VIEW_COHORT')
  @Get(':id')
  async getCohortById(@Param('id') id: string): Promise<Cohort> {
    return this.getCohortById(id);
  }

  @RequiredPermission('VIEW_COHORT')
  @Get()
  async getCohorts(@Query('limit') limit: string) {
    if (limit === '' || !limit) {
      throw new HttpException(
        'No limit provided',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.service.getCohorts(+limit);
  }

  @RequiredPermission('EDIT_COHORT')
  @Delete(':id')
  async delete(@Query('id') id: string) {
    return this.service.delete(id);
  }
}
