import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  EOC: string;

  @IsNotEmpty()
  @IsString()
  cohortId: string;

  @IsNotEmpty()
  @IsString()
  sectionId: string;
}
