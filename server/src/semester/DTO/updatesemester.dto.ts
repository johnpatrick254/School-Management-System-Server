import { Course } from '@prisma/client';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateSemesterDTO {
  @IsOptional()
  @IsString()
  careerId: string;

  @IsOptional()
  @IsString()
  academicYear: string;

}
