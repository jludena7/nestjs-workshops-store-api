import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { Request } from 'express';
import { AuthorizationGuard } from '../../guards/authorization/authorization.guard';
import { Authorization } from '../../decorators/authorization/authorization.decorator';
import { RoleType } from '../../emun/role.type.enum';

@Controller('courses')
@UseGuards(JwtGuard, AuthorizationGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Authorization(RoleType.USER)
  create(@Req() req: Request, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @Authorization(RoleType.USER)
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @Authorization(RoleType.USER)
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @Authorization(RoleType.USER)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Authorization(RoleType.USER)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
