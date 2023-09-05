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
import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';
import { AuthorizationGuard } from '../../guards/authorization/authorization.guard';
import { IsAllowed } from '../../decorators/is-allowed/is-allowed.decorator';
import { RoleType } from '../../emun/role-type.enum';

@Controller('users')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @IsAllowed(RoleType.USER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @IsAllowed(RoleType.USER)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @IsAllowed(RoleType.USER)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @IsAllowed(RoleType.USER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @IsAllowed(RoleType.USER)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
