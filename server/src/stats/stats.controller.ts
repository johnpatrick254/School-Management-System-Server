import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
    constructor(private statService: StatsService) { }

    @Get('student/population')
    async getStudentPopulationStats() {
        return await this.statService.getStudentPopulationChartData();
    }

    @Get('teacher/population')
    async getTeacherPopulationStats() {
        return await this.statService.getTeacherPopulationChartData();
    }

    @Get('career/population')
    async getCareerPopulationStats() {
        return await this.statService.getCareerPopulationChartData();
    }
}
