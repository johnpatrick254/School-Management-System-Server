import { TaskStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class updateTaskDTO{
    @IsOptional()
    @IsString()
    title:string;

    @IsOptional()
    @IsString()
    description:string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status:TaskStatus;

    @IsOptional()
    @IsString()
    assignedUserId:string ;
}