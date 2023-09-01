import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AwardsController } from './awards.controller';
import { Award, AwardSchema } from './model/award.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Award.name, schema: AwardSchema }]),
  ],
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule {}
