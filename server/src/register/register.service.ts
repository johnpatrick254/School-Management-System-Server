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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegisterService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  schoolCode = this.config.get('SCHOOL_CODE');

  async createStudent(data: CreateStudentDTO) {
    try {
      const newPwd = crypto.randomUUID();

      const cohort = await this.prisma.cohort.findUnique({
        where: { id: data.cohortId },
        select: { code: true, students: true, year: true },
      });
      console.log(cohort, this.schoolCode);

      const studentPermission = await this.prisma.permission.findMany({
        where: { type: { in: ['VIEW_STUDENT', 'DELETE_STUDENT'] } },
      });

      const newStudent = await this.prisma.student.create({
        data: {
          code: `${this.schoolCode}/${cohort.code}-${(
            cohort.students.length + 1
          )
            .toString()
            .padStart(3, '0')}/${cohort.year}`,
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
          permissions: {
            connect: studentPermission,
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

  async createTeacher(data: CreateTeacherDTO) {
    try {
      const newPwd = crypto.randomUUID();

      const teacherPermission = await this.prisma.permission.findMany({
        where: {
          type: {
            in: [
              'VIEW_STUDENT',
              'DELETE_STUDENT',
              'VIEW_TEACHER',
              'DELETE_TEACHER',
              'VIEW_COHORT',
            ],
          },
        },
      });

      const teachers = await this.prisma.teacher.findMany();

      const newTeacher = await this.prisma.teacher.create({
        data: {
          ...data,
          code: `${this.schoolCode}/TEC-${(teachers.length + 1)
            .toString()
            .padStart(3, '0')}/${new Date().getFullYear()}`,
          password: await hash(newPwd, 10),
          permissions: { connect: teacherPermission },
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

      const adminPermission = await this.prisma.permission.findMany({
        where: { NOT: { type: 'SUPER_ADMIN' } },
      });

      const admins = await this.prisma.admin.findMany();

      const admin = await this.prisma.admin.create({
        data: {
          ...data,
          code: `${this.schoolCode}/ADM-${(admins.length + 1)
            .toString()
            .padStart(3, '0')}/${new Date().getFullYear()}`,
          password: await hash(newPwd, 10),
          permissions: { connect: adminPermission },
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

      const accountantPermission = await this.prisma.permission.findMany({
        where: { type: { in: ['VIEW_ACCOUNTANT', 'DELETE_ACCOUNTANT'] } },
      });

      const accountants = await this.prisma.accountant.findMany();

      const accountant = await this.prisma.accountant.create({
        data: {
          code: `${this.schoolCode}/ACC-${(accountants.length + 1)
            .toString()
            .padStart(3, '0')}/${new Date().getFullYear()}`,
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: await hash(newPwd, 10),
          permissions: { connect: accountantPermission },
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
