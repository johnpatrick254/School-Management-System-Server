import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    surname: string
    @IsNotEmpty()
    @IsString()
    roleId: string

    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    @IsNotEmpty()
    password_confirm: string
}