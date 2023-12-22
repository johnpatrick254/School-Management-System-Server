import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Section } from '@prisma/client';
import { CreateSectionDTO } from './DTO/createsection.dto';
import { UpdateSectionDTO } from './DTO/updatesection.dto';
import { PrismaService } from '../database/database.service';
import { logger } from '../../src/lib/logger';


@Injectable()
export class SectionService {
    constructor(private prismaService: PrismaService) { }


    async create(data: CreateSectionDTO): Promise<Section> {
        try {
            const section = await this.prismaService.section.create({
                data
            });
            return section;
        } catch (error) {
            if (error.code == "P2002") throw new ConflictException('section already exist');
            logger.log(error)
        }

    }

    async getSections(limit: number): Promise<Section[]> {
        const sections = await this.prismaService.section.findMany({ take: limit })
        return sections;
    }

    async getSectionById(id: string): Promise<Section> {
        const section = await this.prismaService.section.findUnique({ where: { id } })
        if (!section) throw new NotFoundException('section not found');
        return section;
    }

    async update(id: string, updates: UpdateSectionDTO): Promise<Section> {

        const updatedSection = await this.prismaService.section.update({
            where: { id },
            data: updates
        });
        if (!updatedSection) throw new NotFoundException('section not found');
        return updatedSection;
    }
    async delete(id: string): Promise<null> {
        const deletedSection = await this.prismaService.section.findUnique({ where: { id } });
        if (!deletedSection) throw new NotFoundException('section not found');
        try {
            await this.prismaService.section.delete({ where: { id } })
        } catch (error) {
            logger.log(error)
        }
        return null;
    }

}
