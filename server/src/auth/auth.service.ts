import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO } from './DTO/login.dto';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/database/database.service';
import { Accountant, Admin, Student, Teacher } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
}
