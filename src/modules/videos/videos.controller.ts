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
import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';
import { AuthorizationGuard } from '../../guards/authorization/authorization.guard';
import { IsAllowed } from '../../decorators/is-allowed/is-allowed.decorator';
import { RoleType } from '../../emun/role-type.enum';

@Controller('videos')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @IsAllowed(RoleType.USER)
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  @IsAllowed(RoleType.USER)
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  @IsAllowed(RoleType.USER)
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  @IsAllowed(RoleType.USER)
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @IsAllowed(RoleType.USER)
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
