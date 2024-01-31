import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [DatabaseModule],
})
export class RegisterModule {}
