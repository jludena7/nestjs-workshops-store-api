import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AwardDocument = HydratedDocument<Award>;

@Schema()
export class Award {
  @Prop()
  user_id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  podium: number;

  @Prop()
  image: string;
}

export const AwardSchema = SchemaFactory.createForClass(Award);
