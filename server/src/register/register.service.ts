import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStudentDTO } from './DTO/createstudent.dto';
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

  async createStudent(data: CreateStudentDTO) {
    try {
      const newPwd = crypto.randomUUID();

      const newStudent = await this.prisma.student.create({
        data: {
          code: data.code,
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: await hash(newPwd, 10),
          EOC: data.EOC,
          cohort: {
            connect: {
              id: data.cohortId,
            },
          },
          section: {
            connect: {
              id: data.sectionId,
            },
          },
          permissions:{
            connect:{
              id:'closzn17b0001l19sl6yl5afq'
            }
          }
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

  async createTeacher(data: CreateTeacherDTO) {
    try {
      const newPwd = crypto.randomUUID();

      const newTeacher = await this.prisma.teacher.create({
        data: {
          ...data,
          password: await hash(newPwd, 10),
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

  async createAdmin(data: CreateAdminDTO) {
    try {
      const newPwd = crypto.randomUUID();

      const admin = await this.prisma.admin.create({
        data: {
         ...data,
          password: await hash(newPwd, 10),
        },
      });

      return { ...admin, newPwd };
    } catch (error) {
      logger.debug(error);

      if (error.code === 'P2002') {
        throw new ConflictException('Admin Already Exists');
      }

      throw new InternalServerErrorException();
    }
  }

  async createAccountant(data: CreateAccountantDTO) {
    try {
      const newPwd = crypto.randomUUID();

      const accountant = await this.prisma.accountant.create({
        data: {
          code: data.code,
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: await hash(newPwd, 10),
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
