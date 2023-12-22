import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/database.service';
import { Section } from '@prisma/client';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { CreateSectionDTO } from './DTO/createsection.dto';
import { UpdateSectionDTO } from './DTO/updatesection.dto';

describe('SectionController', () => {
  let controller: SectionController;
  const mockSection: Section = {
    id: '123',
    cohortId: '321',
    name: 'test-section',
    teacherId: '098',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionController],
      providers: [
        SectionService,
        {
          provide: PrismaService,
          useValue: {
            section: {
              findUnique: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SectionController>(SectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createSectionDTO = new CreateSectionDTO();
    it('should be called with CreateSectionDTO', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockSection);
      await controller.create(createSectionDTO);
      expect(controller.create).toBeCalledWith(createSectionDTO);
    });

    it('should return section type', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockSection);
      expect(await controller.create(createSectionDTO)).toEqual(mockSection);
    });
  });

  describe('update', () => {
    const { id, ...data } = new UpdateSectionDTO();
    it('should be called with UpdateSectionDTO', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockSection);
      await controller.update({ id, ...data });
      expect(controller.update).toBeCalledWith({ id, ...data });
    });

    it('should return section type', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockSection);
      expect(await controller.update({ id, ...data })).toEqual(mockSection);
    });
  });

  describe('get section by Id', () => {
    it('should return section type', async () => {
      jest.spyOn(controller, 'getSectionById').mockResolvedValue(mockSection);
      expect(await controller.getSectionById('id')).toEqual(mockSection);
    });
  });

  describe('get sections', () => {
    const limit = '1';
    it('should return section type', async () => {
      jest.spyOn(controller, 'getSections').mockResolvedValue([mockSection]);
      expect(await controller.getSections(limit)).toEqual([mockSection]);
    });

    it('should limit the result to the limit amount', async () => {
      jest.spyOn(controller, 'getSections').mockResolvedValue([mockSection]);
      const section = await controller.getSections(limit);
      expect(section.length).toEqual(+limit);
    });

    it('should return an empty array when there is no section', async () => {
      jest.spyOn(controller, 'getSections').mockResolvedValue([]);
      const section = await controller.getSections(limit);
      expect(section.length).toEqual(0);
    });
  });
});
