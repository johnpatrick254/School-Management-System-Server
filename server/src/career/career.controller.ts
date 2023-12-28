import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CareerService } from './career.service';
import { RequiredPermission } from '../auth/permision.decorator';
import { CreateCareerDTO } from './DTO/createcareer.dto';
import { Career } from '@prisma/client';
import { UpdateCareerDTO } from './DTO/updatecareer.dto';

@Controller('career')
export class CareerController {
  constructor(private service: CareerService) {}

  @RequiredPermission('DELETE_CAREER')
  @Post()
  async create(@Body() data: CreateCareerDTO): Promise<Career> {
    return this.service.create(data);
  }

  @RequiredPermission('DELETE_CAREER')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Pick<UpdateCareerDTO, 'code' | 'name' | 'cost'>,
  ): Promise<Career> {
    return this.service.update(id, data);
  }

  @RequiredPermission('VIEW_CAREER')
  @Get(':id')
  async getCareerById(@Param('id') id: string): Promise<Career> {
    return this.service.getCareerById(id);
  }

  @RequiredPermission('VIEW_CAREER')
  @Get()
  async getCareers(limit: number) {
    return this.service.getCareers(limit);
  }

  @RequiredPermission('DELETE_CAREER')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
