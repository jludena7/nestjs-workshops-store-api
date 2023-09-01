import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/model/user.schema';
import { Model } from 'mongoose';
import { createHash, compareHash } from '../../helpers/hash.strategy';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const userRow = await this.userModel.findOne({ email: loginAuthDto.email });
    if (!userRow) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const checkLogin = await compareHash(
      loginAuthDto.password,
      userRow.password,
    );
    if (!checkLogin) {
      throw new HttpException('EMAIL_OR_PASSWORD_INVALID', HttpStatus.CONFLICT);
    }

    const userData = userRow.toObject();
    delete userData.password;

    const token = this.jwtService.sign({ id: userData._id });
    return {
      token,
      user: userData,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { password, ...userTemp } = createUserDto;
    const userData = { ...userTemp, password: await createHash(password) };
    return this.userModel.create(userData);
  }
}
