import { IsEmail, IsString } from 'class-validator';

export class loginDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
