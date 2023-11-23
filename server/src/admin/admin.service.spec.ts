import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../database/database.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateAdminDTO } from './DTO/update-admin.dto';
import { UpdatePasswordDTO } from '../core/DTO/update-password.dto';

describe('AdminService', () => {
  let service: AdminService;
  let prisma: PrismaService;
  const mockAdmin = {
    id: '1234',
    code: 'TEST',
    name: 'ADMIN',
    surname: '1',
    email: '123@mail.com',
    password: 'xyz',
    isActive: true,
  };

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
    }).compile();

    service = module.get<AdminService>(AdminService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getAdminById', () => {
    it('should be defined', () => {
      expect(service.getAdminById).toBeDefined();
    });

    it("should throw 404 if there's no admin", async () => {
      jest.spyOn(prisma.admin, 'findUnique').mockResolvedValue(null);
      await expect(service.getAdminById('1423')).rejects.toThrow(
        new NotFoundException('Admin does not exist'),
      );
    });

    it('should return admin without password', async () => {
      jest
        .spyOn(prisma.admin, 'findUnique')
        .mockResolvedValue({ password: '123', ...mockReturnedAdmin });
      const admin = await service.getAdminById('closzn18c0002l19ssiyjmix0');
      expect(prisma.admin.findUnique).toBeCalledTimes(1);
      expect(admin).toEqual(mockReturnedAdmin);
    });
  });

  describe('getAdmins', () => {
    const limit = 5;
    it('should be defined', () => {
      expect(service.getAdmins).toBeDefined();
    });

    // it('Should returns admins without password', async () => {
    //   jest
    //     .spyOn(prisma.admin, 'findMany')
    //     .mockResolvedValue([{ password: '1234', ...mockReturnedAdmin }]);
    //   const admins = await service.getAdmins(limit);
    //   expect(admins).toEqual([mockReturnedAdmin]);
    // });

    it('Should return  number admins equal to limit', async () => {
      jest.spyOn(prisma.admin, 'findMany').mockResolvedValue([
        { password: '1234', ...mockReturnedAdmin },
        { password: '1234', ...mockReturnedAdmin },
        { password: '1234', ...mockReturnedAdmin },
        { password: '1234', ...mockReturnedAdmin },
        { password: '1234', ...mockReturnedAdmin },
      ]);
      const admins = await service.getAdmins(limit);
      expect(admins.length).toEqual(limit);
    });
  });

  describe('update', () => {
    const updateData = new UpdateAdminDTO();

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should be called with update-admin dto', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockAdmin);
      await service.update(updateData);
      expect(service.update).toBeCalledWith(updateData);
    });

    it("should throw 404 if there's no admin", async () => {
      jest.spyOn(prisma.admin, 'update').mockResolvedValue(null);
      await expect(service.update(updateData)).rejects.toThrow(
        new NotFoundException('Admin does not exist'),
      );
    });

    it('should return admin without password after update', async () => {
      jest
        .spyOn(prisma.admin, 'update')
        .mockResolvedValue({ password: '123', ...mockReturnedAdmin });
      const admin = await service.update(updateData);
      expect(admin).toEqual(mockReturnedAdmin);
    });
  });

  describe('updatePassword', () => {
    it('should be defined', () => {
      expect(service.updatePassword).toBeDefined();
    });

    it('should be called with update-password-dto', async () => {
      const password = new UpdatePasswordDTO();
      jest.spyOn(service, 'updatePassword').mockResolvedValue(null);
      await service.updatePassword(password);
      expect(service.updatePassword).toBeCalledWith(password);
    });

    it('should return null', async () => {
      jest.spyOn(service, 'updatePassword').mockResolvedValue(null);
      expect(service.updatePassword).not.toHaveReturned();
    });
    it("should throw 404 if there's no admin", async () => {
      const password = new UpdatePasswordDTO();
      jest.spyOn(prisma.admin, 'update').mockResolvedValue(null);
      await expect(service.updatePassword(password)).rejects.toThrow(
        new NotFoundException('Admin does not exist'),
      );
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      expect(service.delete).toBeDefined();
    });

    it("should throw 404 if there's no admin", async () => {
      jest.spyOn(prisma.admin, 'delete').mockResolvedValue(null);
      await expect(service.delete('adminId')).rejects.toThrow(
        new NotFoundException('Admin does not exist'),
      );
    });
  });
});
