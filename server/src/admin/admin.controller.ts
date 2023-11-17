import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    return await this.adminService.getAdminById(id);
  }
}
