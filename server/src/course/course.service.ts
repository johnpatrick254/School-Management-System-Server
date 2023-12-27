import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { CreateCourseDTO } from './DTO/createcourse.dto';
import { Course } from '@prisma/client';
import { logger } from '../lib/logger';
import { UpdateCourseDTO } from './DTO/updatecourse.dto';

@Injectable()
export class CourseService {
  constructor(readonly prisma: PrismaService) {}

  async create(data: CreateCourseDTO): Promise<Course> {
    try {
      const course = await this.prisma.course.create({
        data,
      });
      return course;
    } catch (error) {
      logger.error(error);
      if (error.code === 'P2002')
        throw new ConflictException('course already exist');
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, data: UpdateCourseDTO) {
    const updatedCourse = await this.prisma.course.update({
      data,
      where: { id },
    });

    if (!updatedCourse) throw new NotFoundException('course not found');

    return updatedCourse;
  }

  async getCourseById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });
    if (!course) throw new NotFoundException('course not found');
    return course;
  }

  async getCourses(limit: number): Promise<Course[]> {
    const courses = await this.prisma.course.findMany({
      take: limit,
    });

    return courses;
  }

  async delete(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('course not found');

    return await this.prisma.course.delete({ where: { id } });
  }
}
