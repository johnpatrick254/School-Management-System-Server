import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetTasksDTO{
    @IsNotEmpty()
    @IsString()
    page:string;

    @IsNotEmpty()
    @IsString()
    take:string;

    @IsNotEmpty()
    @IsString()
    assignedUserId:string;
}