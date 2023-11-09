import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDTO } from 'src/users/DTO/create-user.dto';
import { CreateStudentDTO } from './DTO/createstudent.dto';
import {
  CreateAccountantDTO,
  CreateAdminDTO,
  CreateTeacherDTO,
} from './DTO/createstaff.dto';

const logger = new Logger();
@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('student')
  async registerStudent(
    @Body('userData') userData: CreateUserDTO,
    @Body('schoolData') schoolData: CreateStudentDTO,
  ) {
    return await this.registerService.createStudent(userData, schoolData);
  }

  @Post('teacher')
  async registerTeacher(
    @Body('userData') userData: CreateUserDTO,
    @Body('schoolData') schoolData: CreateTeacherDTO,
  ) {
    return await this.registerService.createTeacher(userData, schoolData);
  }

  @Post('admin')
  async registerAdmin(
    @Body('userData') userData: CreateUserDTO,
    @Body('schoolData') schoolData: CreateAdminDTO,
  ) {
    return await this.registerService.createAdmin(userData, schoolData);
  }

  @Post('accountant')
  async registerAccountant(
    @Body('userData') userData: CreateUserDTO,
    @Body('schoolData') schoolData: CreateAccountantDTO,
  ) {
    return await this.registerService.createAccountant(userData, schoolData);
  }
}
