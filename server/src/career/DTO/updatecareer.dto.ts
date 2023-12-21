
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { semester } from './createcareer.dto';

export class UpdateCareerDTO {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  cost: number;

  
  @IsOptional()
  semesters: semester;
}
