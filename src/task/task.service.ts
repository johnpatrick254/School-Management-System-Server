import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { createTaskDTO } from './DTO/create-task.dto';
import { updateTaskDTO } from './DTO/update-task.dto';
import { GetTasksDTO } from './DTO/get-tasks.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }
    async createTask(data: createTaskDTO) {
        return await this.prisma.task.create({
            data
        })
    }
    async getTasks(data: GetTasksDTO) {
        const { assignedUserId } = data;
        const take = +data.take;
        const page = +data.page;
        const skip = (page - 1) * take;
        const totals = await this.prisma.task.count({
            where: {
                OR: [
                    {
                        authorId: assignedUserId,
                        assignedUserId: assignedUserId
                    }
                ]
            }
        });
        const lastPage = Math.ceil(totals / take)
        if (page > lastPage || page <= 0) return { tasks: [], meta: { currentPage: page, lastPage } };
        const tasks = await this.prisma.task.findMany({
            where: {
                OR: [
                    {
                        authorId:assignedUserId,
                    },
                    {
                        assignedUserId:assignedUserId
                    }
                ]
            },
            skip,
            take: take,


        })

        return { tasks: tasks, meta: { currentPage: page, lastPage } };
    }
    async getTask(id: string) {

        const task = await this.prisma.task.findUnique({
            where: {
                id
            },

        })

        return task;
    }
    async updateTask(data: updateTaskDTO, id: string) {
        return await this.prisma.task.update({
            data,
            where: {
                id
            }
        })
    }
    async deleteTask(id: string) {
        return await this.prisma.task.delete({
            where: {
                id
            }
        })
    }
}
