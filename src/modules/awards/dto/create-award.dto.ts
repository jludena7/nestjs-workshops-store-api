import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAwardDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  podium: number;

  @IsNotEmpty()
  image: string;
}
