import { Test, TestingModule } from '@nestjs/testing';
import { SemesterController } from './semester.controller';
import { Semester } from '@prisma/client';
import { SemesterService } from './semester.service';
import { PrismaService } from '../database/database.service';
import { CreateSemesterDTO } from './DTO/createsemester.dto';
import { UpdateSemesterDTO } from './DTO/updatesemester.dto';

describe('SemesterController', () => {
  let controller: SemesterController;
  const mockSemester: Semester = {
    id: '123',
    careerId: '321',
    academicYear: '2020',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemesterController],
      providers: [
        SemesterService,
        {
          provide: PrismaService,
          useValue: {
            semester: {
              findUnique: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SemesterController>(SemesterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createSemesterDTO = new CreateSemesterDTO();
    it('should be called with CreateSemesterDTO', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockSemester);
      await controller.create(createSemesterDTO);
      expect(controller.create).toBeCalledWith(createSemesterDTO);
    });

    it('should return semester type', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockSemester);
      expect(await controller.create(createSemesterDTO)).toEqual(mockSemester);
    });
  });

  describe('update', () => {
    const updateSemesterDTO = new UpdateSemesterDTO();
    const id = '123';
    it('should be called with UpdateSemesterDTO', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockSemester);
      await controller.update(id, updateSemesterDTO);
      expect(controller.update).toBeCalledWith(id, updateSemesterDTO);
    });

    it('should return semester type', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockSemester);
      expect(await controller.update(id, updateSemesterDTO)).toEqual(
        mockSemester,
      );
    });
  });

  describe('get semester by Id', () => {
    const id = '123';
    it('should return semester type', async () => {
      jest.spyOn(controller, 'getSemesterById').mockResolvedValue(mockSemester);
      expect(await controller.getSemesterById(id)).toEqual(mockSemester);
    });
  });

  describe('get semesters', () => {
    const limit = '1';
    it('should return semester type', async () => {
      jest.spyOn(controller, 'getSemesters').mockResolvedValue([mockSemester]);
      expect(await controller.getSemesters(limit)).toEqual([mockSemester]);
    });

    it('should limit the result to the limit amount', async () => {
      jest.spyOn(controller, 'getSemesters').mockResolvedValue([mockSemester]);
      const semester = await controller.getSemesters(limit);
      expect(semester.length).toEqual(+limit);
    });

    it('should return an empty array when there is no semester', async () => {
      jest.spyOn(controller, 'getSemesters').mockResolvedValue([]);
      const semester = await controller.getSemesters(limit);
      expect(semester.length).toEqual(0);
    });
  });
});
