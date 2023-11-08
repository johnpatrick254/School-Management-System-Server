import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { updateUserDTO } from './DTO/update-user.dto';
import {hash} from "bcrypt"


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = [];
    const completeUsers = await this.prisma.user.findMany();

    completeUsers.map((user) =>
      users.push({
        name: user.name,
        surname: user.surname,
        type: user.type,
        id: user.id,
        email: user.email,
      }),
    );

    return users;
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    const newPwd = crypto.randomUUID()
    try {
   
      const newUser = await this.prisma.user.create({ data: {
        ...user,
        password:await hash(newPwd,100),
        permissions:{
          connect: [{id:"cloopkd910000l1g8joi0ouww"}]
        }
      } });
      return newUser;
    } catch (error) {
      console.log(error.message);
      if (error.code === 'P2002') {
        throw new ConflictException('User Already Exists');
      }
      throw new InternalServerErrorException();
    }
  }
  async updateUser(id: string, user: updateUserDTO): Promise<User> {
    try {
      const newUser = await this.prisma.user.update({
        data: user,
        where: { id },
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException("User does'nt exist");
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateStaffUser(
    id: string,
    data: Pick<updateUserDTO, 'password'>,
  ): Promise<User> {
    try {
      const newUser = await this.prisma.user.update({
        data,
        where: { id },
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException("User does'nt exist");
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const deletedUser = await this.prisma.user.delete({ where: { id } });
      return deletedUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException("User does'nt exist");
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
