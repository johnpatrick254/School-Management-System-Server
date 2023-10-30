import { Controller, Put, UnauthorizedException, Post, HttpStatus, HttpException, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/create-user.dto';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('/')
    async createUser(@Body() user: CreateUserDTO) {
       return await this.userService.createUser(user)
    }
}


