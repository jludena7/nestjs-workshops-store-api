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
import { AwardsService } from './awards.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { AuthorizationGuard } from '../../guards/authorization/authorization.guard';
import { Authorization } from '../../decorators/authorization/authorization.decorator';
import { RoleType } from '../../emun/role.type.enum';

@Controller('awards')
@UseGuards(JwtGuard, AuthorizationGuard)
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @Post()
  @Authorization(RoleType.USER)
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardsService.create(createAwardDto);
  }

  @Get()
  @Authorization(RoleType.USER)
  findAll() {
    return this.awardsService.findAll();
  }

  @Get(':id')
  @Authorization(RoleType.USER)
  findOne(@Param('id') id: string) {
    return this.awardsService.findOne(id);
  }

  @Patch(':id')
  @Authorization(RoleType.USER)
  update(@Param('id') id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.awardsService.update(id, updateAwardDto);
  }

  @Delete(':id')
  @Authorization(RoleType.USER)
  remove(@Param('id') id: string) {
    return this.awardsService.remove(id);
  }
}
