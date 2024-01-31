import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { CreateSemesterDTO } from './DTO/createsemester.dto';
import { logger } from '../lib/logger';
import { UpdateSemesterDTO } from './DTO/updatesemester.dto';
import { Semester } from '@prisma/client';

@Injectable()
export class SemesterService {
    constructor(private prisma: PrismaService) { }
    async create(data: CreateSemesterDTO): Promise<Semester> {
        try {
            const semester = await this.prisma.semester.create({
                data
            });
            return semester;
        } catch (error) {
            if (error.code === "P2002") throw new ConflictException('semester already exist');
            logger.error(error)
        }

    };

    async update(id: string, data: UpdateSemesterDTO): Promise<Semester> {
        try {
            const updatedSemester = await this.prisma.semester.update(
                {
                    where: { id },
                    data
                }
            );
            return updatedSemester;
        } catch (error) {
            logger.error(error);
            if (error.code === "P2025") throw new NotFoundException('semester not found');
            throw new InternalServerErrorException(JSON.stringify(error))
        }

    };

    async getSemesterById(id: string): Promise<Semester> {
        const semester = await this.prisma.semester.findUnique({ where: { id } });
        if (!semester) throw new NotFoundException('semester not found');
        return semester;
    };

    async getSemesters(limit: number): Promise<Semester[]> {
        const semester = await this.prisma.semester.findMany({
            take: limit
        });
        return semester;
    };

    async delete(id: string): Promise<null> {
        const deletedSection = await this.prisma.semester.findUnique({ where: { id } });
        if (!deletedSection) throw new NotFoundException('semester not found');
        try {
            await this.prisma.semester.delete({ where: { id } })
        } catch (error) {
            logger.log(error)
        }
        return null;
    }

}
