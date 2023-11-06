import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStudentDTO} from './DTO/createstudent.dto';
import { UserService } from 'src/users/users.service';
import { CreateUserDTO } from 'src/users/DTO/create-user.dto';
import { PrismaService } from 'src/database/database.service';
import { Logger } from '@nestjs/common/services';
const logger = new Logger()
@Injectable()
export class RegisterService {
  constructor(private userService:UserService,private prisma:PrismaService){}
  
  async createStudent (userData:CreateUserDTO,schoolData:CreateStudentDTO){
    logger.verbose("verboser")
    logger.error("error")
    logger.log("log")
    logger.warn("Warning")
    logger.debug("debug")

               const newUser = await this.userService.createUser(userData);
               try {
                const newStudent = await this.prisma.student.create({
                    data:{
                        id:newUser.id,
                        ...schoolData
                    }
                   })
                   return newStudent;
               } catch (error) {
    
                 throw new InternalServerErrorException()

               }
               
               
  }

}
