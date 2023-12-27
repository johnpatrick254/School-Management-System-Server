import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { AdminModule } from './admin/admin.module';
import { CohortModule } from './cohort/cohort.module';
import { CareerModule } from './career/career.module';
import { SectionModule } from './section/section.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SemesterModule } from './semester/semester.module';



@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    DatabaseModule,
    RegisterModule,
    AuthModule,
    AdminModule,
    CohortModule,
    CareerModule,
    SectionModule,
    ScheduleModule.forRoot(),
    SemesterModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
