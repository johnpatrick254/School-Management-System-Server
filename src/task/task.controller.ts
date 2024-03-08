import { Controller, Post, Body, Query, Param, Get, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDTO } from './DTO/create-task.dto';
import { GetTasksDTO } from './DTO/get-tasks.dto';
import { updateTaskDTO } from './DTO/update-task.dto';

@Controller('task')
export class TaskController {
    constructor(private service: TaskService) { }
    @Post()
    async createTask(@Body() data: createTaskDTO) {
        return await this.service.createTask(data);
    };

    @Get()
    async getTasks(@Query() data: GetTasksDTO) {
        return await this.service.getTasks(data);;
    };

    @Get('/:id')
    async getTask(@Param('id') id: string) {
        return this.service.getTask(id);
    };

    @Put('/:id')
    async updateTask(@Body() data: updateTaskDTO, @Param('id') id: string) {
        return await this.service.updateTask(data, id);
    };
    
    @Delete('/:id')
    async deleteTask(@Param('id') id: string) {
        return this.service.deleteTask(id);
    }
}
