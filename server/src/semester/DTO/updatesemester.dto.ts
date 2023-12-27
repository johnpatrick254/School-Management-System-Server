import { Course } from '@prisma/client';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateSemesterDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  academicYear: string;

  @IsOptional()
  @IsArray()
  courses: Course[];
}
