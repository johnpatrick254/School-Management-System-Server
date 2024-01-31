import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateAdminDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname: string;
}
