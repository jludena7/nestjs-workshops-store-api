import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { VideosModule } from './modules/videos/videos.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AwardsModule } from './modules/awards/awards.module';

@Module({
  imports: [AuthModule, VideosModule, CoursesModule, AwardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
