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
import { CourseModule } from './course/course.module';
import { SemesterModule } from './semester/semester.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { CustomCacheInterceptor } from './lib/caching';
import { StatsModule } from './stats/stats.module';
import { TaskModule } from './task/task.module';



@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    CacheModule.register({isGlobal:true,ttl:600}),
    ScheduleModule.forRoot(),
    DatabaseModule,
    RegisterModule,
    AuthModule,
    AdminModule,
    CohortModule,
    CareerModule,
    SectionModule,
    CourseModule,
    SemesterModule,
    StatsModule,
    TaskModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomCacheInterceptor,
    }
  ],
})
export class AppModule { }
