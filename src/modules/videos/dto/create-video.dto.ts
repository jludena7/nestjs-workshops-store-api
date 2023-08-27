import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @IsNotEmpty()
  @Length(70, 500)
  description: string;

  @IsUrl()
  src: string;
}
