import { IsString,IsStrongPassword } from "class-validator";

export class UpdatePasswordDTO{
    @IsStrongPassword({minLength:8,minNumbers:1,minUppercase:1})
    @IsString()
    name: string;
    
    @IsStrongPassword({minLength:8,minNumbers:1,minUppercase:1})
    @IsString()
    surname:string;
}