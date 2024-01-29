import { Injectable, NotFoundException ,Logger} from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class StatsService {
    constructor(private prismaService: PrismaService) { }
    protected logger : Logger
    async getStudentPopulationChartData() {
        const totalNumberOfStudents = await this.prismaService.student.count({
            where: {
                isActive: {
                    equals: true
                }
            }
        });
        if (!totalNumberOfStudents) throw new NotFoundException("No students found");
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 3;
        let data = [];
        let labels = [];

        for (let index = startYear; index <= currentYear; index++) {
            labels.push(index);
            const totalStudents = await this.prismaService.student.findMany({
                where: {
                    cohort: {
                        year: index
                    }
                }
            });
            data.push(totalStudents.length);
        };

        const percentageIncrease = Math.round(((data.at(-2) - data.at(-1)) / data.at(-1)) * 100);

        return {
            chartData: {
                data: data,
                labels: labels,
            },
            percentage: (percentageIncrease >= 0) ? `+${percentageIncrease}` : `${percentageIncrease}`,
            totalUsers: totalNumberOfStudents,
            type: "Students"
        }
    };

    async getCareerPopulationChartData() {
        const totalNumberOfCareers = await this.prismaService.career.count();
        if (!totalNumberOfCareers) throw new NotFoundException("No Careers found");
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 3;
        let data = [];
        let labels = [];

        for (let index = startYear; index <= currentYear; index++) {
            labels.push(index);
            const totalCareers = await this.prismaService.career.findMany({
                where: {
                    year: index
                }
            });
            data.push(totalCareers.length);
        };

        const percentageIncrease = Math.round(((data.at(-2) - data.at(-1)) / data.at(-1)) * 100);

        return {
            chartData: {
                data: data,
                labels: labels,
            },
            percentage: (percentageIncrease >= 0) ? `+${percentageIncrease}` : `${percentageIncrease}`,
            totalUsers: totalNumberOfCareers,
            type: 'Careers'
        }
    };


    async getTeacherPopulationChartData() {
        const totalNumberOfTeachers = await this.prismaService.teacher.count({
            where: {
                isActive: true
            }
        });

        if (!totalNumberOfTeachers) throw new NotFoundException("No Teachers found");
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 3;
        let data = [];
        let labels = [];

        for (let index = startYear; index <= currentYear; index++) {
            labels.push(index);
            const totalTeachers = await this.prismaService.teacher.findMany({
                where: {
                    year: index
                }
            });
            data.push(totalTeachers.length);
        };

        const percentageIncrease = Math.round(((data.at(-2) - data.at(-1)) / data.at(-1)) * 100);

        return {
            chartData: {
                data: data,
                labels: labels,
            },
            percentage: (percentageIncrease >= 0) ? `+${percentageIncrease}` : `${percentageIncrease}`,
            totalUsers: totalNumberOfTeachers,
            type: "Teacher"
        }
    };

}
