import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDTO } from 'src/users/DTO/create-user.dto';
import { CreateStudentDTO } from './DTO/createstudent.dto';
import { CreateAdminDTO } from './DTO/creatstaff.dto';

const logger = new Logger()
@Controller('register')
export class RegisterController {
    constructor(private registerService: RegisterService) { }

    @Post('student')
    async registerStudent(@Body('userData') userData: CreateUserDTO, @Body('schoolData')  schoolData: CreateStudentDTO) {
        return await this.registerService.createStudent(userData, schoolData)
    }
    @Post('admin')
    async registerAdmin(@Body('userData') userData: CreateUserDTO, @Body('schoolData')  schoolData: CreateAdminDTO) {
        return await this.registerService.createAdmin(userData, schoolData)
    }

 
}
