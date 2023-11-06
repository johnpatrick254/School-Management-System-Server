import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class CreateTeacherDTO {


    @IsNotEmpty()
    @IsString()
    code: string


}


export class CreateAccountantDTO {

    @IsNotEmpty()
    @IsString()
    code: string


}
export class CreateAdminDTO {

    @IsNotEmpty()
    @IsString()
    code: string


}