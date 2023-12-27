import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { CreateSemesterDTO } from './DTO/createsemester.dto';
import { Semester } from '@prisma/client';
import { UpdateSemesterDTO } from './DTO/updatesemester.dto';
import { RequiredPermission } from '../auth/permision.decorator';

@Controller('semester')
export class SemesterController {
    constructor(private semesterService: SemesterService) { }
    @RequiredPermission('CREATE_SEMESTER')
    @Post()
    async create(@Body() data: CreateSemesterDTO): Promise<Semester> {
        return await this.semesterService.create(data);
    };
    @RequiredPermission('UPDATE_SEMESTER')
    @Put('/:id')
    async update(@Param('id') id: string, @Body() data: UpdateSemesterDTO): Promise<Semester> {
        if (!id || id.length === 0) throw new BadRequestException('provide id');
        return await this.semesterService.update(id, data);
    };

    @RequiredPermission('VIEW_SEMESTER')
    @Get('/:id')
    async getSemesterById(@Param('id') id: string): Promise<Semester> {
        if (!id || id.length === 0) throw new BadRequestException('please provide id');
        return await this.semesterService.getSemesterById(id);
    };

    @RequiredPermission('VIEW_SEMESTER')
    @Get()
    async getSemesters(@Query('limit') limit: string): Promise<Semester[]> {
        if (!limit || limit.length === 0) throw new BadRequestException('please provide limit');
        return await this.semesterService.getSemesters(+limit);
    };

    @RequiredPermission('UPDATE_SEMESTER')
    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<null> {
        return await this.semesterService.delete(id);
    }

}
