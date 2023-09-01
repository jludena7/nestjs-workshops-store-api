import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @IsNotEmpty()
  @Length(3, 50)
  description: string;

  @IsNotEmpty()
  @Length(3, 20)
  duration: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  schedule: string;
}
