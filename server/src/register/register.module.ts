import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports:[UsersModule,DatabaseModule]
})
export class RegisterModule {}
