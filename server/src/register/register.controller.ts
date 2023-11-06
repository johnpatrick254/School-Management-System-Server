import { Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDTO } from 'src/users/DTO/create-user.dto';
import { CreateStudentDTO } from './DTO/createstudent.dto';

@Controller('register')
export class RegisterController {
    constructor(private registerService: RegisterService) { }

    @Post('/student')
    async registerStudent(userData: CreateUserDTO, schoolData: CreateStudentDTO) {
        return await this.registerService.createStudent(userData, schoolData)
    }
}
