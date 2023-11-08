import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import {ConfigModule}  from "@nestjs/config"
import { RegisterModule } from './register/register.module';
@Module({
  imports: [ConfigModule.forRoot({envFilePath:`.env`}),DatabaseModule, UsersModule,RegisterModule],
  providers: [],
})
export class AppModule {}
