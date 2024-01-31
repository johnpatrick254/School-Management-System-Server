import { Test, TestingModule } from '@nestjs/testing';
import { CareerService } from './career.service';
import { PrismaService } from '../database/database.service';
import { Career } from '@prisma/client';
import { CreateCareerDTO } from './DTO/createcareer.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateCareerDTO } from './DTO/updatecareer.dto';

describe('CareerService', () => {
  let service: CareerService;
  let prisma: PrismaService;
  const mockCareer: Career = {
    id: 'j1s2',
    code: 'JS',
    name: 'javascript',
    cost:200
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CareerService,
        {
          provide: PrismaService,
          useValue: {
            career: {
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

    service = module.get<CareerService>(CareerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create career', () => {
    const createCareerDTO = new CreateCareerDTO();
    it('should be called with CreateCareerDTO', async () => {
      jest.spyOn(service, 'create');
      await service.create(createCareerDTO);
      expect(service.create).toBeCalledWith(createCareerDTO);
    });

    it('should be throw a conflict exception for duplicates', async () => {
      //organize
      jest.spyOn(prisma.career, 'create').mockRejectedValue({ code: 'P2002' });
      //act
      //assert
      await expect(service.create(createCareerDTO)).rejects.toThrow(
        new ConflictException('career already exist'),
      );
    });

    it('should return full career', async () => {
      //organize
      jest.spyOn(prisma.career, 'create').mockResolvedValue(mockCareer);
      //act
      //assert
      expect(await service.create(createCareerDTO)).toEqual(mockCareer);
    });
  });

  describe('update career', () => {
    const { id, ...data } = new UpdateCareerDTO();
    it('should be called with UpdateCareerDTO', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockCareer);
      await service.update(id, data);
      expect(service.update).toBeCalledWith(id, data);
    });

    it('should throw NotFoundException() when there is no career', async () => {
      jest.spyOn(prisma.career, 'update').mockResolvedValue(null);
      await expect(service.update(id, data)).rejects.toThrow(
        new NotFoundException('career not found'),
      );
    });

    it('should return updated career type', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockCareer);
      expect(await service.update(id, data)).toEqual(mockCareer);
     });
  });

  describe('get career by Id', () => {
    it('should throw NotFoundException() when there is no career', async () => {
      jest.spyOn(prisma.career, 'findUnique').mockResolvedValue(null);
      await expect(service.getCareerById('id')).rejects.toThrow(
        new NotFoundException('career not found'),
      );
    });

    it('should return career type', async () => {
      jest.spyOn(prisma.career, 'findUnique').mockResolvedValue(mockCareer);
      expect(await service.getCareerById('id')).toEqual(mockCareer);
    });
  });

  describe('getcareers', () => {
    const limit = 5;
    it('should return an empty array when there is no career', async () => {
      jest.spyOn(prisma.career, 'findMany').mockResolvedValue([]);
      const careers = await service.getCareers(limit);
      expect(careers.length).toEqual(0);
    });

    it('should return number of career equal to limit', async () => {
      jest
        .spyOn(prisma.career, 'findMany')
        .mockResolvedValue([
          mockCareer,
          mockCareer,
          mockCareer,
          mockCareer,
          mockCareer,
        ]);
      const careers = await service.getCareers(limit)
      expect(careers.length).toEqual(limit);
    });
  });

  describe('delete career', () => {
    it('should throw NotFoundException() when there is no career', async () => {
      jest.spyOn(prisma.career, 'delete').mockResolvedValue(null);
      await expect(service.delete('id')).rejects.toThrow(
        new NotFoundException('career not found'),
      );
    });

    it('should return null when delete career successfully', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(null);
      expect(await service.delete('id')).toEqual(null);
    });
  });
});
