import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleType } from '../../../emun/role-type.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default: [RoleType.USER],
  })
  roles: string[];

  @Prop({ required: true })
  full_name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
