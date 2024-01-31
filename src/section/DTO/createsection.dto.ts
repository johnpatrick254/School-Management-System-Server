import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSectionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  cohortId: string;

  @IsNotEmpty()
  @IsString()
  teacherId: string;
}
