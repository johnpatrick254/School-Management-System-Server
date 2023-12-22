import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type semester = {
  name: string;
  year: string;
}[];

export class CreateCareerDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
