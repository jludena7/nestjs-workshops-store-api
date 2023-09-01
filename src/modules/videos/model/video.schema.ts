import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop()
  course_id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  src: string;

  @Prop()
  score: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
