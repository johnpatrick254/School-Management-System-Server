import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
