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
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { AuthorizationGuard } from '../../guards/authorization/authorization.guard';
import { Authorization } from '../../decorators/authorization/authorization.decorator';
import { RoleType } from '../../emun/role.type.enum';

@Controller('videos')
@UseGuards(JwtGuard, AuthorizationGuard)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @Authorization(RoleType.USER)
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  @Authorization(RoleType.USER)
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  @Authorization(RoleType.USER)
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  @Authorization(RoleType.USER)
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @Authorization(RoleType.USER)
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
