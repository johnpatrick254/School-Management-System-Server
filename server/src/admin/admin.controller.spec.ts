import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { UpdateAdminDTO } from './DTO/update-admin.dto';
import { UpdatePasswordDTO } from '../core/DTO/update-password.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PrismaService } from '../database/database.service';

describe('AdminController', () => {
  let controller: AdminController;
  const mockReturnedAdmin = {
    id: '1234',
    code: 'TEST',
    name: 'ADMIN',
    surname: '1',
    email: '123@mail.com',
    permissions: [{ id: 'xyz' }],
    isActive: true,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: PrismaService,
          useValue: {
            admin: {
              findUnique: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
      controllers: [AdminController],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAdminById', () => {
    it('should be defined', () => {
      expect(controller.getAdminById).toBeDefined();
    });
  });

  describe('getAdmins', () => {
    it('should be defined', () => {
      expect(controller.getAdmins).toBeDefined();
    });
    it('should throw httpException when not limit is provided', async () => {
      jest.spyOn(controller, 'getAdmins');
      await expect(controller.getAdmins(null)).rejects.toThrow(
        new HttpException('No limit provided', HttpStatus.UNPROCESSABLE_ENTITY),
      );
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it('should be called with updateAdminDTO', async () => {
      const { id, ...adminData } = new UpdateAdminDTO();
      jest.spyOn(controller, 'update').mockResolvedValue(mockReturnedAdmin);
      await controller.update(id, adminData);
      expect(controller.update).toBeCalledWith(id, adminData);
    });
  });

  describe('updatePassword', () => {
    it('should be defined', () => {
      expect(controller.updatePassword).toBeDefined();
    });
    it('should be called with updatePasswordDTO', async () => {
      const updatePasswordDTO = new UpdatePasswordDTO();
      jest.spyOn(controller, 'updatePassword').mockResolvedValue(null);
      await controller.updatePassword(updatePasswordDTO);
      expect(controller.updatePassword).toBeCalledWith(updatePasswordDTO);
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      expect(controller.delete).toBeDefined();
    });
    it('should be call with string id', async () => {
      const id: string = '123';
      jest.spyOn(controller, 'delete').mockResolvedValue(null);
      await controller.delete(id);
      expect(controller.delete).toBeCalledWith(id);
    });
  });
});
