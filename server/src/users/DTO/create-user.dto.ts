import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import UserType from "src/lib/types/UserType.type";

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    surname: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsEnum(UserType)
    type: UserType
}