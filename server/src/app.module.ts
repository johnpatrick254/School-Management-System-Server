import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    DatabaseModule,
    RegisterModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
