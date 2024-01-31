import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCohortDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  careerId: string;
}
