import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/database.service';
import { Section } from '@prisma/client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDTO } from './DTO/createsection.dto';
import { UpdateSectionDTO } from './DTO/updatesection.dto';

describe('SectionService', () => {
  let service: SectionService;
  let prisma: PrismaService;
  const mockSection: Section = {
    id: '123',
    cohortId: '321',
    name: 'test-section',
    teacherId: '098',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        {
          provide: PrismaService,
          useValue: {
            section: {
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

    service = module.get<SectionService>(SectionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create section', () => {
    const createSectionDTO = new CreateSectionDTO();
    it('should be called with CreateSectionDTO', async () => {
      jest.spyOn(service, 'create');
      await service.create(createSectionDTO);
      expect(service.create).toBeCalledWith(createSectionDTO);
    });

    it('should be throw a conflict exception for duplicates', async () => {
      //organize
      jest.spyOn(prisma.section, 'create').mockRejectedValue({ code: 'P2002' });
      //act
      //assert
      await expect(service.create(createSectionDTO)).rejects.toThrow(
        new ConflictException('section already exist'),
      );
    });

    it('should return full section', async () => {
      //organize
      jest.spyOn(prisma.section, 'create').mockResolvedValue(mockSection);
      //act
      //assert
      expect(await service.create(createSectionDTO)).toEqual(mockSection);
    });
  });

  describe('update section', () => {
    const { id, ...data } = new UpdateSectionDTO();
    it('should be called with UpdateSectionDTO', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockSection);
      await service.update({id,... data});
      expect(service.update).toBeCalledWith({id,... data});
    });

    it('should throw NotFoundException() when there is no section', async () => {
      jest.spyOn(prisma.section, 'update').mockResolvedValue(null);
      await expect(service.update({id, ...data})).rejects.toThrow(
        new NotFoundException('section not found'),
      );
    });

    it('should return updated section type', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockSection);
      expect(await service.update({id, ...data})).toEqual(mockSection);
    });
  });

  describe('get section by Id', () => {
    it('should throw NotFoundException() when there is no section', async () => {
      jest.spyOn(prisma.section, 'findUnique').mockResolvedValue(null);
      await expect(service.getSectionById('id')).rejects.toThrow(
        new NotFoundException('section not found'),
      );
    });

    it('should return section type', async () => {
      jest.spyOn(prisma.section, 'findUnique').mockResolvedValue(mockSection);
      expect(await service.getSectionById('id')).toEqual(mockSection);
    });
  });

  describe('getsections', () => {
    const limit = 5;
    it('should return an empty array when there is no section', async () => {
      jest.spyOn(prisma.section, 'findMany').mockResolvedValue([]);
      const sections = await service.getSections(limit);
      expect(sections.length).toEqual(0);
    });

    it('should return number of section equal to limit', async () => {
      jest
        .spyOn(prisma.section, 'findMany')
        .mockResolvedValue([
          mockSection,
          mockSection,
          mockSection,
          mockSection,
          mockSection,
        ]);
      const sections = await service.getSections(limit);
      expect(sections.length).toEqual(limit);
    });
  });

  describe('delete section', () => {
    it('should throw NotFoundException() when there is no section', async () => {
      jest.spyOn(prisma.section, 'delete').mockResolvedValue(null);
      await expect(service.delete('id')).rejects.toThrow(
        new NotFoundException('section not found'),
      );
    });

    it('should return null when delete section successfully', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(null);
      expect(await service.delete('id')).toEqual(null);
    });
  });
});
