import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports:[DatabaseModule],
  exports:[UserService]
})
export class UsersModule {}
