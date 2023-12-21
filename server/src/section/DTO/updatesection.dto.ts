import { IsOptional, IsString } from 'class-validator';

export class UpdateSectionDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  cohortId: string;

  @IsOptional()
  @IsString()
  teacherId: string;
}
