import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  id: string;
}
