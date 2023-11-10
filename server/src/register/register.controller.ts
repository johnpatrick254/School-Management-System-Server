import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateStudentDTO } from './DTO/createstudent.dto';
import {
  CreateAccountantDTO,
  CreateAdminDTO,
  CreateTeacherDTO,
} from './DTO/createstaff.dto';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('student')
  async registerStudent(@Body() data: CreateStudentDTO) {
    return await this.registerService.createStudent(data);
  }

  @Post('teacher')
  async registerTeacher(@Body() data: CreateTeacherDTO) {
    return await this.registerService.createTeacher(data);
  }

  @Post('admin')
  async registerAdmin(@Body() data: CreateAdminDTO) {
    return await this.registerService.createAdmin(data);
  }

  @Post('accountant')
  async registerAccountant(@Body() data: CreateAccountantDTO) {
    return await this.registerService.createAccountant(data);
  }
}
