import { Test, TestingModule } from '@nestjs/testing';
import { CohortService } from './cohort.service';
import { PrismaService } from '../database/database.service';
import { Cohort } from '@prisma/client';
import { CreateCohortDTO } from './DTO/createcohort.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateCohortDTO } from './DTO/updatecohort.dto';

describe('CohortService', () => {
  let service: CohortService;
  let prisma: PrismaService;
  const mockCohort: Cohort = {
    id: 'j1s2',
    code: 'JS',
    year: 2023,
    careerId: 'careerid',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CohortService,
        {
          provide: PrismaService,
          useValue: {
            cohort: {
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

    service = module.get<CohortService>(CohortService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create cohort', () => {
    const createCohortDTO = new CreateCohortDTO();
    it('should be called with CreateCohortDTO', async () => {
      jest.spyOn(service, 'create');
      await service.create(createCohortDTO);
      expect(service.create).toBeCalledWith(createCohortDTO);
    });

    it('should be throw a conflict exception for duplicates', async () => {
      //organize
      jest.spyOn(prisma.cohort, 'create').mockRejectedValue({ code: 'P2002' });
      //act
      //assert
      await expect(service.create(createCohortDTO)).rejects.toThrow(
        new ConflictException('cohort already exist'),
      );
    });

    it('should return full cohort', async () => {
      //organize
      jest.spyOn(prisma.cohort, 'create').mockResolvedValue(mockCohort);
      //act
      //assert
      expect(await service.create(createCohortDTO)).toEqual(mockCohort);
    });
  });

  describe('update cohort', () => {
    const { id, ...data } = new UpdateCohortDTO();
    it('should be called with UpdateCohortDTO', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockCohort);
      await service.update(id, data);
      expect(service.update).toBeCalledWith(id, data);
    });

    it('should throw NotFoundException() when there is no cohort', async () => {
      jest.spyOn(prisma.cohort, 'update').mockResolvedValue(null);
      await expect(service.update(id, data)).rejects.toThrow(
        new NotFoundException('cohort not found'),
      );
    });

    it('should return updated cohort type', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockCohort);
      expect(await service.update(id, data)).toEqual(mockCohort);
    });
  });

  describe('get cohort by Id', () => {
    it('should throw NotFoundException() when there is no cohort', async () => {
      jest.spyOn(prisma.cohort, 'findUnique').mockResolvedValue(null);
      await expect(service.getCohortById('id')).rejects.toThrow(
        new NotFoundException('cohort not found'),
      );
    });

    it('should return cohort type', async () => {
      jest.spyOn(prisma.cohort, 'findUnique').mockResolvedValue(mockCohort);
      expect(await service.getCohortById('id')).toEqual(mockCohort);
    });
  });

  describe('getcohorts', () => {
    const limit = 5;
    it('should return an empty array when there is no cohort', async () => {
      jest.spyOn(prisma.cohort, 'findMany').mockResolvedValue([]);
      const cohorts = await service.getCohorts(limit);
      expect(cohorts.length).toEqual(0);
    });

    it('should return number of cohort equal to limit', async () => {
      jest
        .spyOn(prisma.cohort, 'findMany')
        .mockResolvedValue([
          mockCohort,
          mockCohort,
          mockCohort,
          mockCohort,
          mockCohort,
        ]);
      const cohorts = await service.getCohorts(limit);
      expect(cohorts.length).toEqual(limit);
    });
  });

  describe('delete cohorts', () => {
    it('should throw NotFoundException() when there is no cohort', async () => {
      jest.spyOn(prisma.cohort, 'delete').mockResolvedValue(null);
      await expect(service.delete('id')).rejects.toThrow(
        new NotFoundException('cohort not found'),
      );
    });

    it('should return null when delete cohort successfully', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(null);
      expect(await service.delete('id')).toEqual(null);
    });
  });
});
