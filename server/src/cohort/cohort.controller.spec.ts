import { Test, TestingModule } from '@nestjs/testing';
import { CohortController } from './cohort.controller';
import { CohortService } from './cohort.service';
import { PrismaService } from '../database/database.service';
import { Cohort } from '@prisma/client';
import { CreateCohortDTO } from './DTO/createcohort.dto';
import { UpdateCohortDTO } from './DTO/updatecohort.dto';

describe('CohortController', () => {
  let controller: CohortController;
  const mockCohort: Cohort = {
    id: 'j1s2',
    code: 'JS',
    name: 'javascript',
    year: 2023,
    careerId: 'careerid',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CohortController],
      providers: [
        CohortService,
        {
          provide: PrismaService,
          useValue: {
            cohort: {
              findUnique: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CohortController>(CohortController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createCohortDTO = new CreateCohortDTO();
    it('should be called with CreateCohortDTO', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockCohort);
      await controller.create(createCohortDTO);
      expect(controller.create).toBeCalledWith(createCohortDTO);
    });

    it('should return cohort type', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockCohort);
      expect(await controller.create(createCohortDTO)).toEqual(mockCohort);
    });
  });

  describe('update', () => {
    const { id, ...data } = new UpdateCohortDTO();
    it('should be called with UpdateCohortDTO', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockCohort);
      await controller.update(id, data);
      expect(controller.update).toBeCalledWith(id, data);
    });

    it('should return cohort type', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockCohort);
      expect(await controller.update(id, data)).toEqual(mockCohort);
    });
  });

  describe('get cohort by Id', () => {
    it('should return cohort type', async () => {
      jest.spyOn(controller, 'getCohortById').mockResolvedValue(mockCohort);
      expect(await controller.getCohortById('id')).toEqual(mockCohort);
    });
  });

  describe('get cohorts', () => {
    const limit = 1;
    it('should return cohorts type', async () => {
      jest.spyOn(controller, 'getCohorts').mockResolvedValue([mockCohort]);
      expect(await controller.getCohorts(limit)).toEqual([mockCohort]);
    });

    it('should limit the result to the limit amount', async () => {
      jest.spyOn(controller, 'getCohorts').mockResolvedValue([mockCohort]);
      const cohorts = await controller.getCohorts(limit);
      expect(cohorts.length).toEqual(limit);
    });

    it('should return an empty array when there is no cohorts', async () => {
      jest.spyOn(controller, 'getCohorts').mockResolvedValue([]);
      const cohorts = await controller.getCohorts(limit);
      expect(cohorts.length).toEqual(0);
    });
  });
});
