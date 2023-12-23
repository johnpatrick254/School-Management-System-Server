import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdatePasswordDTO } from '../core/DTO/update-password.dto';
import { UpdateAdminDTO } from './DTO/update-admin.dto';
import { RequiredPermission } from '../auth/permision.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @RequiredPermission('VIEW_ADMIN')
  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    return await this.adminService.getAdminById(id);
  }

  @RequiredPermission('SUPER_ADMIN')
  @Get()
  async getAdmins(@Query('limit') limit: string) {
    if (limit === '' || !limit) {
      throw new HttpException(
        'No limit provided',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.adminService.getAdmins(+limit);
  }

  @RequiredPermission('EDIT_ADMIN')
  @Put()
  async updatePassword(data: UpdatePasswordDTO): Promise<void> {
    return await this.adminService.updatePassword(data);
  }

  @RequiredPermission('EDIT_ADMIN')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Pick<UpdateAdminDTO, 'name' | 'surname'>,
  ) {
    return await this.adminService.update({ id, ...data });
  }

  @RequiredPermission('SUPER_ADMIN')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.adminService.delete(id);
  }
}
