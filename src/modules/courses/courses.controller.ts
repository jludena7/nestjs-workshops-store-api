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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';
import { AuthorizationGuard } from '../../guards/authorization/authorization.guard';
import { IsAllowed } from '../../decorators/is-allowed/is-allowed.decorator';
import { RoleType } from '../../emun/role-type.enum';
import { AuthUser } from '../../decorators/auth-user/auth-user.decorator';

@Controller('courses')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @IsAllowed(RoleType.USER, RoleType.ADMIN)
  create(@AuthUser() authUser: any, @Body() createCourseDto: CreateCourseDto) {
    const data = { ...createCourseDto, author_id: authUser._id };
    return this.coursesService.create(data);
  }

  @Get()
  @IsAllowed(RoleType.USER, RoleType.ADMIN)
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @IsAllowed(RoleType.USER, RoleType.ADMIN)
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @IsAllowed(RoleType.USER, RoleType.ADMIN)
  update(
    @Param('id') id: string,
    @AuthUser() authUser: any,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    const data = { ...updateCourseDto, author_id: authUser._id };
    return this.coursesService.update(id, data);
  }

  @Delete(':id')
  @IsAllowed(RoleType.USER, RoleType.ADMIN)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
