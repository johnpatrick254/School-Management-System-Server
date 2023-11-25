import { IsOptional, IsString } from 'class-validator';

export class UpdateCohortDTO {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  careerId: string;
}
