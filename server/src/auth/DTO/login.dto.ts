import { IsString } from 'class-validator';

export class loginDTO {
  @IsString()
  code: string;

  @IsString()
  password: string;
}
