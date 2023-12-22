import { Test, TestingModule } from '@nestjs/testing';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';
import { PrismaService } from '../database/database.service';
import { Career } from '@prisma/client';
import { CreateCareerDTO } from './DTO/createcareer.dto';
import { UpdateCareerDTO } from './DTO/updatecareer.dto';

describe('CareerController', () => {
  let controller: CareerController;
  const mockCareer: Career = {
    id: 'j1s2',
    code: 'JS',
    name: 'javascript',
    cost:200
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareerController],
      providers: [
        CareerService,
        {
          provide: PrismaService,
          useValue: {
            career: {
              findUnique: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CareerController>(CareerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createCareerDTO = new CreateCareerDTO();
    it('should be called with CreateCareerDTO', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockCareer);
      await controller.create(createCareerDTO);
      expect(controller.create).toBeCalledWith(createCareerDTO);
    });

    it('should return career type', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(mockCareer);
      expect(await controller.create(createCareerDTO)).toEqual(mockCareer);
    });
  });

  describe('update', () => {
    const { id, ...data } = new UpdateCareerDTO();
    it('should be called with UpdateCareerDTO', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockCareer);
      await controller.update(id, data);
      expect(controller.update).toBeCalledWith(id, data);
    });

    it('should return career type', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(mockCareer);
      expect(await controller.update(id, data)).toEqual(mockCareer);
    });
  });

  describe('get career by Id', () => {
    it('should return career type', async () => {
      jest.spyOn(controller, 'getCareerById').mockResolvedValue(mockCareer);
      expect(await controller.getCareerById('id')).toEqual(mockCareer);
    });
  });

  describe('get career', () => {
    const limit = 1;
    it('should return career type', async () => {
      jest.spyOn(controller, 'getCareers').mockResolvedValue([mockCareer]);
      expect(await controller.getCareers(limit)).toEqual([mockCareer]);
    });

    it('should limit the result to the limit amount', async () => {
      jest.spyOn(controller, 'getCareers').mockResolvedValue([mockCareer]);
      const career = await controller.getCareers(limit);
      expect(career.length).toEqual(limit);
    });

    it('should return an empty array when there is no career', async () => {
      jest.spyOn(controller, 'getCareers').mockResolvedValue([]);
      const career = await controller.getCareers(limit);
      expect(career.length).toEqual(0);
    });
  });
});
