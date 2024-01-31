import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/database.service';
import { Course } from '@prisma/client';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './DTO/createcourse.dto';
import { UpdateCourseDTO } from './DTO/updatecourse.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CourseController', () => {
  let controller: CourseController;
  const mockCourse: Course = {
    id: 'j1s2',
    code: 'JS',
    name: 'javascript',
    contentUrl: 'mockurl',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: {
            course: {
              findUnique: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createCourse = new CreateCourseDTO();
    it('should be called with createCourse', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockCourse);
      await controller.create(createCourse);
      expect(controller.create).toBeCalledWith(createCourse);
    });

    it('should return Course type', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockCourse);
      expect(await controller.create(createCourse)).toEqual(mockCourse);
    });
  });

  describe('update', () => {
    const id = 'someid';
    const updateData = new UpdateCourseDTO();
    it('should be called with UpdateCourseDTO', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockCourse);
      await controller.update(id, updateData);
      expect(controller.update).toBeCalledWith(id, updateData);
    });
    it('should be throw status 400 Bad Request exception if id is not provided', async () => {
      const nullId = null;
      jest.spyOn(controller, 'update');
      await expect(controller.update(nullId, updateData)).rejects.toThrow(
        new HttpException('No id provided', HttpStatus.BAD_REQUEST),
      );
    });

    it('should return course type', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockCourse);
      expect(await controller.update(id, updateData)).toEqual(mockCourse);
    });
  });

  describe('get course by Id', () => {
    it('should return course type', async () => {
      jest.spyOn(controller, 'getCourseById').mockResolvedValue(mockCourse);
      expect(await controller.getCourseById('id')).toEqual(mockCourse);
    });
  });

  describe('get courses', () => {
    const limit = '1';
    it('should return course type', async () => {
      jest.spyOn(controller, 'getCourses').mockResolvedValue([mockCourse]);
      expect(await controller.getCourses(limit)).toEqual([mockCourse]);
    });
    it('should be throw status 400 Bad Request exception limit is not provided', async () => {
      const nullLimit = null;
      jest.spyOn(controller, 'getCourses');
      await expect(controller.getCourses(nullLimit)).rejects.toThrow(
        new HttpException('No limit provided', HttpStatus.BAD_REQUEST),
      );
    });

    it('should limit the result to the limit amount', async () => {
      jest.spyOn(controller, 'getCourses').mockResolvedValue([mockCourse]);
      const course = await controller.getCourses(limit);
      expect(course.length).toEqual(+limit);
    });

    it('should return an empty array when there is no course', async () => {
      jest.spyOn(controller, 'getCourses').mockResolvedValue([]);
      const course = await controller.getCourses(limit);
      expect(course.length).toEqual(0);
    });
  });

  describe('delete', () => {
    it('should be throw status 400 Bad Request exception Id is not provided', async () => {
      const nullId = null;
      jest.spyOn(controller, 'delete');
      await expect(controller.delete(null)).rejects.toThrow(
        new HttpException('No id provided', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
