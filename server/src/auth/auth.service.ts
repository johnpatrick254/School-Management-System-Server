import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { loginDTO } from './DTO/login.dto';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/database/database.service';
import { Accountant, Admin, Student, Teacher } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { logger } from 'src/lib/logger';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async loginStudent(data: loginDTO): Promise<Student> {
    const currentUser = await this.prisma.student.findUnique({
      where: {
        code: data.code,
      },
    });

    if (!currentUser)
      throw new UnauthorizedException('Code or password is incorrect');

    if (!(await compare(data.password, currentUser.password)))
      throw new UnauthorizedException('Code or password is incorrect');

    return currentUser;
  }

  async loginStaff(data: loginDTO): Promise<Teacher | Admin | Accountant> {
    let currentStaff: Teacher | Admin | Accountant | null = null;

    const isTeacher = await this.prisma.teacher.findFirst({
      where: {
        code: data.code,
      },
    });

    if (isTeacher) {
      if (await compare(data.password, isTeacher.password)) {
        currentStaff = isTeacher;
        return currentStaff;
      } else {
        throw new UnauthorizedException('Code or password is incorrect');
      }
    }

    const isAdmin = await this.prisma.admin.findFirst({
      where: {
        code: data.code,
      },
    });

    if (isAdmin) {
      if (await compare(data.password, isAdmin.password)) {
        currentStaff = isAdmin;
        return currentStaff;
      } else {
        throw new UnauthorizedException('Code or password is incorrect');
      }
    }

    const isAccountant = await this.prisma.accountant.findFirst({
      where: {
        code: data.code,
      },
    });

    if (isAccountant) {
      if (await compare(data.password, isAccountant.password)) {
        currentStaff = isAccountant;
        return currentStaff;
      } else {
        throw new UnauthorizedException('Code or password is incorrect');
      }
    }

    throw new UnauthorizedException('Code or password is incorrect');
  }

  validateUser(accessToken: string): boolean {
    const secret = this.config.get('SECRET');
    try {
      if (!verify(accessToken, secret)) throw new UnauthorizedException();
      return true;
    } catch (error) {
      logger.debug(error);
      throw new InternalServerErrorException();
    }
  }
}
