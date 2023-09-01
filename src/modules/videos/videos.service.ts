import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video, VideoDocument } from './model/video.schema';
import { Model } from 'mongoose';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}

  create(createVideoDto: CreateVideoDto) {
    return this.videoModel.create(createVideoDto);
  }

  findAll() {
    return this.videoModel.find();
  }

  findOne(id: string) {
    return this.videoModel.findById(id);
  }

  update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.videoModel.findOneAndUpdate({ _id: id }, updateVideoDto, {
      upsert: true,
      new: true,
    });
  }

  remove(id: string) {
    return this.videoModel.findByIdAndDelete(id);
  }
}
