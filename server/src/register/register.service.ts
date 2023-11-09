import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStudentDTO } from './DTO/createstudent.dto';
import { CreateUserDTO } from 'src/users/DTO/create-user.dto';
import { PrismaService } from 'src/database/database.service';
import {
  CreateAccountantDTO,
  CreateAdminDTO,
  CreateTeacherDTO,
} from './DTO/createstaff.dto';
import { hash } from 'bcrypt';
import { logger } from '../lib/logger';

@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) {}

  async createStudent(userData: CreateUserDTO, schoolData: CreateStudentDTO) {
    try {
      const newPwd = crypto.randomUUID();
      const newStudent = await this.prisma.student.create({
        data: {
          code: schoolData.code,
          EOC: schoolData.EOC,
          user: {
            create: {
              ...userData,
              ['password']: await hash(newPwd, 10),
            },
          },
          cohort: {
            connect: {
              id: schoolData.cohortId,
            },
          },
          section: {
            connect: {
              id: schoolData.sectionId,
            },
          },
        },
      });
      return { ...newStudent, newPwd };
    } catch (error) {
      logger.debug(error);
      if (error.code === 'P2002') {
        throw new ConflictException('Student Already Exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async createTeacher(userData: CreateUserDTO, schoolData: CreateTeacherDTO) {
    try {
      const newPwd = crypto.randomUUID();
      const newTeacher = await this.prisma.teacher.create({
        data: {
          code: schoolData.code,
          user: {
            create: {
              ...userData,
              ['password']: await hash(newPwd, 10),
            },
          },
        },
      });
      return { ...newTeacher, newPwd };
    } catch (error) {
      logger.debug(error);
      if (error.code === 'P2002') {
        throw new ConflictException('Teacher Already Exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async createAdmin(userData: CreateUserDTO, schoolData: CreateAdminDTO) {
    try {
      const newPwd = crypto.randomUUID();
      const admin = await this.prisma.admin.create({
        data: {
          ...schoolData,
          user: {
            create: {
              ...userData,
              ['password']: await hash(newPwd, 10),
            },
          },
        },
      });

      return {
        ...admin,
        newPwd,
      };
    } catch (error) {
      logger.debug(error);
      if (error.code === 'P2002') {
        throw new ConflictException('Admin Already Exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async createAccountant(
    userData: CreateUserDTO,
    schoolData: CreateAccountantDTO,
  ) {
    try {
      const newPwd = crypto.randomUUID();
      const accountant = await this.prisma.accountant.create({
        data: {
          ...schoolData,
          user: {
            create: {
              ...userData,
              ['password']: await hash(newPwd, 10),
            },
          },
        },
      });
      return { ...accountant, newPwd };
    } catch (error) {
      logger.debug(error);
      if (error.code === 'P2002') {
        throw new ConflictException('Accountant Already Exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
