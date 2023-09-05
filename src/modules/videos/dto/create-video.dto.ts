import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  course_id: string;

  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @Length(70, 500)
  description: string;

  @IsUrl()
  @IsNotEmpty()
  src: string;

  score: number;
}
