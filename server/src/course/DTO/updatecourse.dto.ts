import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDTO {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contentUrl: string;
}
