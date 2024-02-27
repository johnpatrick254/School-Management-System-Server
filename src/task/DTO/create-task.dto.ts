import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createTaskDTO{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsString()
    authorId:string;

    @IsOptional()
    @IsString()
    assignedUserId:string ;
}