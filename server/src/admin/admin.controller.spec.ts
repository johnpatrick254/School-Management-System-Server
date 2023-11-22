import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { UpdateAdminDTO } from './DTO/update-admin.dto';
import { UpdatePasswordDTO } from 'src/core/DTO/update-password.dto';

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
      controllers: [AdminController],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("getAdminById", () => {
    it('should be defined', () => {
      expect(controller.getAdminById).toBeDefined();
    });
  });

  describe("getAdmins", () => {
    it('should be defined', () => {
      expect(controller.getAdmins).toBeDefined();
    });
  });

  describe("update", () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it("should be called with updateAdminDTO", async () => {
      const updateAdminDTO = new UpdateAdminDTO()
      jest.spyOn(controller, "update").mockResolvedValue(mockReturnedAdmin)
      await controller.update(updateAdminDTO);
      expect(controller.update).toBeCalledWith(updateAdminDTO);

    })
  })

  describe("updatePassword", () => {
    it('should be defined', () => {
      expect(controller.updatePassword).toBeDefined();
    });
    it("should be called with updatePasswordDTO", async () => {
      const updatePasswordDTO = new UpdatePasswordDTO()
      jest.spyOn(controller, "updatePassword").mockResolvedValue(mockReturnedAdmin)
      await controller.update(updatePasswordDTO);
      expect(controller.updatePassword).toBeCalledWith(updatePasswordDTO);
    })
  });
})
