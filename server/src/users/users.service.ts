import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';
import { CreateUserDTO } from './DTO/create-user.dto';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async getUser(id: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: id,
    });

    if (!user) throw new NotFoundException();
    return user;
  }
  async createUser(user: CreateUserDTO): Promise<User> {
    if (user.password !== user.password_confirm) {
      throw new HttpException("Passwords do not match", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    try {
      const { password_confirm, ...userData } = user
      const newUser = await this.prisma.user.create({ data: userData })
      return newUser

    } catch (error) {
      console.log(error.message);
      if (error.code === 'P2002') {
        throw new ConflictException("User Already Exists")
      }
      throw new InternalServerErrorException()

    }
  }
  async updateUser(id: string, user: User): Promise<User> {
    try {
      const newUser = await this.prisma.user.update({ data: user, where: { id } })
      return newUser

    } catch (error) {
      console.log(error);
    }
  }
  async deleteUser(id: string): Promise<User> {
    try {
      const deletedUser = await this.prisma.user.delete({ where: { id } })
      if (!deletedUser) {
        throw new NotFoundException("User does'nt exist")
      }
      return deletedUser
    } catch (error) {
      console.log(error);
    }
  }

}
