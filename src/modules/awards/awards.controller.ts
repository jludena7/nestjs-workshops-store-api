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
import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';
import { AuthorizationGuard } from '../../guards/authorization/authorization.guard';
import { IsAllowed } from '../../decorators/is-allowed/is-allowed.decorator';
import { RoleType } from '../../emun/role-type.enum';

@Controller('awards')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @Post()
  @IsAllowed(RoleType.USER)
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardsService.create(createAwardDto);
  }

  @Get()
  @IsAllowed(RoleType.USER)
  findAll() {
    return this.awardsService.findAll();
  }

  @Get(':id')
  @IsAllowed(RoleType.USER)
  findOne(@Param('id') id: string) {
    return this.awardsService.findOne(id);
  }

  @Patch(':id')
  @IsAllowed(RoleType.USER)
  update(@Param('id') id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.awardsService.update(id, updateAwardDto);
  }

  @Delete(':id')
  @IsAllowed(RoleType.USER)
  remove(@Param('id') id: string) {
    return this.awardsService.remove(id);
  }
}
