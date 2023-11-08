import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDTO {

    @IsNotEmpty()
    @IsString()
    code: string
    @IsNotEmpty()
    @IsString()
    EOC: string
    @IsNotEmpty()
    @IsString()
    cohortId: string
    @IsNotEmpty()
    @IsString()
    sectionId: string
}