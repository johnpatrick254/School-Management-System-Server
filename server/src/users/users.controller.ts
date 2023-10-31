import {
  Controller,
  Put,
  Post,
  Body,
  Get,
  Param,
  Delete,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { User } from '@prisma/client';
import { updateUserDTO } from './DTO/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Put('/superadmin/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: updateUserDTO,
  ): Promise<User> {
    return await this.userService.updateUser(id, user);
  }

  @Put('/staff/:id')
  async staffUpdateInfo(
    @Param('id') id: string,
    @Body() userInfo: Pick<updateUserDTO, 'password'>,
  ) {
    if (!userInfo.password) throw new BadRequestException('Input missing');
    const { password, ...otherInfo } = userInfo;
    return await this.userService.updateStaffUser(id, { password });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
