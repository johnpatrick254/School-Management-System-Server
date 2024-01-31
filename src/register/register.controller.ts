import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateStudentDTO } from './DTO/createstudent.dto';
import {
  CreateAccountantDTO,
  CreateAdminDTO,
  CreateTeacherDTO,
} from './DTO/createstaff.dto';
import { RequiredPermission } from '../auth/permision.decorator';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @RequiredPermission("CREATE_STAFF")
  @Post('student')
  async registerStudent(@Body() data: CreateStudentDTO) {
    return await this.registerService.createStudent(data);
  }
  
  @RequiredPermission("CREATE_STAFF")
  @Post('teacher')
  async registerTeacher(@Body() data: CreateTeacherDTO) {
    return await this.registerService.createTeacher(data);
  }

  @RequiredPermission("SUPER_ADMIN")
  @Post('admin')
  async registerAdmin(@Body() data: CreateAdminDTO) {
    return await this.registerService.createAdmin(data);
  }
  @RequiredPermission("CREATE_STAFF")
  @Post('accountant')
  async registerAccountant(@Body() data: CreateAccountantDTO) {
    return await this.registerService.createAccountant(data);
  }
}
