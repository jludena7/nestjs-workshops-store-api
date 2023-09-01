import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { AuthorizationGuard } from '../../guards/authorization/authorization.guard';
import { Authorization } from '../../decorators/authorization/authorization.decorator';
import { RoleType } from '../../emun/role.type.enum';

@Controller('users')
@UseGuards(JwtGuard, AuthorizationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Authorization(RoleType.USER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Authorization(RoleType.USER)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Authorization(RoleType.USER)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Authorization(RoleType.USER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Authorization(RoleType.USER)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
