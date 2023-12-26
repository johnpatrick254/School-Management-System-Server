import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/database.service';
import { Course } from '@prisma/client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCourseDTO } from './DTO/createcourse.dto';
import { UpdateCourseDTO } from './DTO/updatecourse.dto';
import { CourseService } from './course.service';


describe('CourseService', () => {
  let service: CourseService;
  let prisma: PrismaService;
  const mockCourse: Course = {
    id: 'j1s2',
    code: 'JS',
    name: 'javascript',
    teacherId: 'careerid',
    contentUrl:'mockurl'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: {
            course: {
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create course', () => {
    const createCourse = new CreateCourseDTO();
    it('should be called with createCourse', async () => {
      jest.spyOn(service, 'create');
      await service.create(createCourse);
      expect(service.create).toBeCalledWith(createCourse);
    });

    it('should be throw a conflict exception for duplicates', async () => {
      //organize
      jest.spyOn(prisma.course, 'create').mockRejectedValue({ code: 'P2002' });
      //act
      //assert
      await expect(service.create(createCourse)).rejects.toThrow(
        new ConflictException('course already exist'),
      );
    });

    it('should return full course', async () => {
      //organize
      jest.spyOn(prisma.course, 'create').mockResolvedValue(mockCourse);
      //act
      //assert
      expect(await service.create(createCourse)).toEqual(mockCourse);
    });
  });

  describe('update course', () => {
    const id  = 'someid';
    const updateData  = new UpdateCourseDTO();
    it('should be called with UpdateCourseDTO', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockCourse);
      await service.update({id,...updateData});
      expect(service.update).toBeCalledWith({id,...updateData});
    });

    it('should throw NotFoundException() when there is no course', async () => {
      jest.spyOn(prisma.course, 'update').mockResolvedValue(null);
      await expect(service.update({id,...updateData})).rejects.toThrow(
        new NotFoundException('course not found'),
      );
    });

    it('should return updated course type', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockCourse);
      expect(await service.update({id,...updateData})).toEqual(mockCourse);
     });
  });

  describe('get course by Id', () => {
    it('should throw NotFoundException() when there is no course', async () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue(null);
      await expect(service.getCourseById('id')).rejects.toThrow(
        new NotFoundException('course not found'),
      );
    });

    it('should return course type', async () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue(mockCourse);
      expect(await service.getCourseById('id')).toEqual(mockCourse);
    });
  });

  describe('getcourses', () => {
    const limit = 5;
    it('should return an empty array when there is no course', async () => {
      jest.spyOn(prisma.course, 'findMany').mockResolvedValue([]);
      const courses = await service.getCourses(limit);
      expect(courses.length).toEqual(0);
    });

    it('should return number of course equal to limit', async () => {
      jest
        .spyOn(prisma.course, 'findMany')
        .mockResolvedValue([
          mockCourse,
          mockCourse,
          mockCourse,
          mockCourse,
          mockCourse,
        ]);
      const courses = await service.getCourses(limit)
      expect(courses.length).toEqual(limit);
    });
  });

  describe('delete course', () => {
    it('should throw NotFoundException() when there is no course', async () => {
      jest.spyOn(prisma.course, 'delete').mockResolvedValue(null);
      await expect(service.delete('id')).rejects.toThrow(
        new NotFoundException('course not found'),
      );
    });

    it('should return null when delete course successfully', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(null);
      expect(await service.delete('id')).toEqual(null);
    });
  });
});
