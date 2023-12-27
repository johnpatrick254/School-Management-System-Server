import { Course } from '@prisma/client';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateSemesterDTO {
  @IsNotEmpty()
  @IsString()
  academicYear: string;

  @IsNotEmpty()
  @IsString()
  careerId: string;
}
