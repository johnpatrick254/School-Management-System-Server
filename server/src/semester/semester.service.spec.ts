import { Test, TestingModule } from '@nestjs/testing';
import { SemesterService } from './semester.service';
import { PrismaService } from 'src/database/database.service';
import { Semester } from '@prisma/client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateSemesterDTO } from './DTO/createsemester.dto';
import { UpdateSemesterDTO } from './DTO/updatesemester.dto';

describe('SemesterService', () => {
  let service: SemesterService;
  let prisma: PrismaService;
  const mockSemester: Semester = {
    id: '123',
    code: 'semester-code',
    careerId: '321',
    name: 'semester-test',
    year: '2020',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SemesterService,
        {
          provide: PrismaService,
          useValue: {
            semester: {
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

    service = module.get<SemesterService>(SemesterService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create semester', () => {
    const createSemesterDTO = new CreateSemesterDTO();
    it('should be called with createSemesterDTO', async () => {
      jest.spyOn(service, 'create');
      await service.create(createSemesterDTO);
      expect(service.create).toBeCalledWith(createSemesterDTO);
    });

    it('should be throw a conflict exception for duplicates', async () => {
      //organize
      jest
        .spyOn(prisma.semester, 'create')
        .mockRejectedValue({ code: 'P2002' });
      //act
      //assert
      await expect(service.create(createSemesterDTO)).rejects.toThrow(
        new ConflictException('semester already exist'),
      );
    });

    it('should return full semester', async () => {
      //organize
      jest.spyOn(prisma.semester, 'create').mockResolvedValue(mockSemester);
      //act
      //assert
      expect(await service.create(createSemesterDTO)).toEqual(mockSemester);
    });
  });

  describe('update semester', () => {
    const updateSemesterDTO = new UpdateSemesterDTO();
    const id = '1';
    it('should be called with UpdateSemesterDTO', async () => {
      jest.spyOn(service, 'update');
      await service.update(id, updateSemesterDTO);
      expect(service.update).toBeCalledWith(id, updateSemesterDTO);
    });

    it('should throw NotFoundException() when there is no semester', async () => {
      jest.spyOn(prisma.semester, 'update').mockResolvedValue(null);
      await expect(service.update(id, updateSemesterDTO)).rejects.toThrow(
        new NotFoundException('semester not found'),
      );
    });

    it('should return updated semester type', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockSemester);
      expect(await service.update(id, updateSemesterDTO)).toEqual(mockSemester);
    });
  });

  describe('get semester by Id', () => {
    const id = '123';
    it('should throw NotFoundException() when there is no semester', async () => {
      jest.spyOn(prisma.semester, 'findUnique').mockResolvedValue(null);
      await expect(service.getSemesterById(id)).rejects.toThrow(
        new NotFoundException('semester not found'),
      );
    });

    it('should return semester type', async () => {
      jest.spyOn(prisma.semester, 'findUnique').mockResolvedValue(mockSemester);
      expect(await service.getSemesterById(id)).toEqual(mockSemester);
    });
  });

  describe('getSemesters', () => {
    const limit = 5;
    it('should return an empty array when there is no semester', async () => {
      jest.spyOn(prisma.semester, 'findMany').mockResolvedValue([]);
      const semesters = await service.getSemesters(limit);
      expect(semesters.length).toEqual(0);
    });

    it('should return number of semester equal to limit', async () => {
      jest
        .spyOn(prisma.semester, 'findMany')
        .mockResolvedValue([
          mockSemester,
          mockSemester,
          mockSemester,
          mockSemester,
          mockSemester,
        ]);
      const semester = await service.getSemester(limit);
      expect(semester.length).toEqual(limit);
    });
  });

  describe('delete semester', () => {
    const id = '123';
    it('should throw NotFoundException() when there is no semester', async () => {
      jest.spyOn(prisma.semester, 'delete').mockResolvedValue(null);
      await expect(service.delete(id)).rejects.toThrow(
        new NotFoundException('semester not found'),
      );
    });

    it('should return null when delete semester successfully', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(null);
      expect(await service.delete(id)).toEqual(null);
    });
  });
});
