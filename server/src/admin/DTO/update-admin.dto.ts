import { IsString,IsOptional } from "class-validator";

export class UpdateAdminDTO{
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    surname:string;
}