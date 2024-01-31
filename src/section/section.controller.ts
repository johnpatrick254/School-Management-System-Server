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
import { CreateSectionDTO } from './DTO/createsection.dto';
import { SectionService } from './section.service';
import { Section } from '@prisma/client';
import { UpdateSectionDTO } from './DTO/updatesection.dto';
import { RequiredPermission } from '../../src/auth/permision.decorator';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}
  @RequiredPermission('CREATE_SECTION')
  @Post()
  async create(@Body() data: CreateSectionDTO): Promise<Section> {
    return await this.sectionService.create(data);
  }

  @RequiredPermission('DELETE_SECTION')
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateSectionDTO,
  ): Promise<Section> {
    if (id === '' || !id)
      throw new HttpException(
        'No Limit provided',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return await this.sectionService.update(id, data);
  }

  @RequiredPermission('VIEW_SECTION')
  @Get('/:id')
  async getSectionById(@Param('id') id: string): Promise<Section> {
    return await this.sectionService.getSectionById(id);
  }

  @RequiredPermission('VIEW_SECTION')
  @Get()
  async getSections(@Query('limit') limit: string): Promise<Section[]> {
    if (limit === '' || !limit)
      throw new HttpException(
        'No Limit provided',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return await this.sectionService.getSections(+limit);
  }
  @RequiredPermission('DELETE_SECTION')
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<null> {
    return await this.sectionService.delete(id);
  }
}
