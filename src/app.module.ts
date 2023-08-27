import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { VideosModule } from './modules/videos/videos.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AwardsModule } from './modules/awards/awards.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    VideosModule,
    CoursesModule,
    AwardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
