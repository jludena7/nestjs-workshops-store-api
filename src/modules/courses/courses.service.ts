import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './model/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>
  ) {}

  create(createCourseDto: CreateCourseDto) {
    return this.courseModel.create(createCourseDto);
  }

  findAll() {
    return this.courseModel.find();
  }

  findOne(id: string) {
    return this.courseModel.findById(id);
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findByIdAndUpdate(id, updateCourseDto, {
      upsert: true,
      new: true,
    });
  }

  remove(id: string) {
    return this.courseModel.findByIdAndDelete(id);
  }
}
