import { Injectable } from '@nestjs/common';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Award, AwardDocument } from './model/award.schema';
import { Model } from 'mongoose';

@Injectable()
export class AwardsService {
  constructor(
    @InjectModel(Award.name) private readonly awardModel: Model<AwardDocument>,
  ) {}

  create(createAwardDto: CreateAwardDto) {
    return this.awardModel.create(createAwardDto);
  }

  findAll() {
    return this.awardModel.find();
  }

  findOne(id: string) {
    return this.awardModel.findById(id);
  }

  update(id: string, updateAwardDto: UpdateAwardDto) {
    return this.awardModel.findByIdAndUpdate(id, updateAwardDto, {
      upsert: true,
      new: true,
    });
  }

  remove(id: string) {
    return this.awardModel.findByIdAndDelete(id);
  }
}
