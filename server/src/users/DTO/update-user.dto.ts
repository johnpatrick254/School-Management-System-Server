import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class updateUserDTO{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name:string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    surname:string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password:string
}