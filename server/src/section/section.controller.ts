import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateSectionDTO } from './DTO/createsection.dto';
import { SectionService } from './section.service';
import { Section } from '@prisma/client';
import { UpdateSectionDTO } from './DTO/updatesection.dto';

@Controller('section')
export class SectionController {
    constructor(private sectionService: SectionService) { }

    @Post()
    async create(@Body() data: CreateSectionDTO): Promise<Section> {
        return await this.sectionService.create(data);
    }

    @Put()
    async update(@Body() data: UpdateSectionDTO): Promise<Section> {
        return await this.sectionService.update(data);
    }

    @Get('/:id')
    async getSectionById(@Param('id') id: string): Promise<Section> {
        return await this.sectionService.getSectionById(id);
    }

    @Get()
    async getSections(@Query('id') limit: string): Promise<Section[]> {
        return await this.sectionService.getSections(+limit);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<null> {
        return await this.sectionService.delete(id);
    }

}