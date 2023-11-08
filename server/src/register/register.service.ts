import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateStudentDTO } from './DTO/createstudent.dto';
import { CreateUserDTO } from 'src/users/DTO/create-user.dto';
import { PrismaService } from 'src/database/database.service';
import { CreateAdminDTO } from './DTO/creatstaff.dto';
import { hash } from "bcrypt";

const logger = new Logger()
@Injectable()
export class RegisterService {
    constructor(private prisma: PrismaService) { }

    async createStudent(userData: CreateUserDTO, schoolData: CreateStudentDTO) {
        const newPwd = crypto.randomUUID();
        try {
            const newStudent = await this.prisma.student.create({
                data: {
                    code: schoolData.code,
                    EOC: schoolData.EOC,
                    user: {
                        create: {
                            ...userData,
                            ['password']: await hash(newPwd, 10)
                        }
                    },
                    cohort: {
                        connect: {
                            id: schoolData.cohortId
                        }
                    },
                    section: {
                        connect: {
                            id: schoolData.sectionId,
                        }
                    }
                }
            })
            return { ...newStudent, newPwd };
        } catch (error) {
            logger.debug(error)
            if (error.code === 'P2002') {
                throw new ConflictException('Student Already Exists');
            }
            throw new InternalServerErrorException();
        }
    }

    async createAdmin(userData: CreateUserDTO, schoolData: CreateAdminDTO) {
        const newPwd = crypto.randomUUID();
        try {
            const admin = await this.prisma.admin.create({
                data: {
                    ...schoolData,
                    user: {
                        create: {
                            ...userData,
                            ['password']: await hash(newPwd, 10)
                        }
                    }
                }
            })

            return {
                ...admin,
                newPwd
            }
        } catch (error) {
            logger.debug(error)
            if (error.code === 'P2002') {
                throw new ConflictException('Admin Already Exists');
            }
            throw new InternalServerErrorException();
        }

    }
}
