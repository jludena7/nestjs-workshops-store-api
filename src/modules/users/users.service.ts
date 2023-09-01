import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.schema';
import { Model } from 'mongoose';
import { createHash } from '../../helpers/hash.strategy';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userTemp } = createUserDto;
    const userDataInsert = {
      ...userTemp,
      password: await createHash(password),
    };

    const userRow = await this.userModel.create(userDataInsert);
    const userData = userRow.toObject();
    delete userData.password;

    return userData;
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const userRow = await this.userModel.findById(id);
    if (!userRow) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const userData = userRow.toObject();
    delete userData.password;

    return userData;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, ...userTemp } = updateUserDto;

    let userDataUpdate: object = userTemp;
    if (password) {
      userDataUpdate = {
        ...userTemp,
        password: await createHash(password),
      };
    }

    const userRow = await this.userModel.findByIdAndUpdate(id, userDataUpdate, {
      upsert: true,
      new: true,
    });

    const userData = userRow.toObject();
    delete userData.password;

    return userData;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
