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
import { CourseService } from './course.service';
import { CreateCourseDTO } from './DTO/createcourse.dto';
import { Course } from '@prisma/client';
import { UpdateCourseDTO } from './DTO/updatecourse.dto';

@Controller('course')
export class CourseController {
  constructor(private service: CourseService) {}

  @Post()
  async create(@Body() data: CreateCourseDTO): Promise<Course> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateCourseDTO,
  ): Promise<Course> {
    if (!id) throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
    return await this.service.update(id, updateData);
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string): Promise<Course> {
    return await this.service.getCourseById(id);
  }

  @Get('/')
  async getCourses(@Query('limit') limit: string): Promise<Course[]> {
    if (!limit)
      throw new HttpException('No limit provided', HttpStatus.BAD_REQUEST);
    return await this.service.getCourses(+limit);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!id) throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
    return await this.service.delete(id);
  }
}
