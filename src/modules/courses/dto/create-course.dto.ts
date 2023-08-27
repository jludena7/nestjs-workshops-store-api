import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @IsNotEmpty()
  @Length(3, 50)
  description: string;

  @IsNotEmpty()
  @Length(3, 30)
  duration: string;

  @IsNumber()
  capacity: number;

  schedule: string;
}
