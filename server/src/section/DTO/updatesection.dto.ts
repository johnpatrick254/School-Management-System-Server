import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSectionDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

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
