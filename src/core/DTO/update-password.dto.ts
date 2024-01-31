import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1 })
  @IsString()
  password: string;

  @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1 })
  @IsString()
  passwordConfirm: string;
}
