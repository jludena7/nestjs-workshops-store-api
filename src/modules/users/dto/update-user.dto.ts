import { IsEmail, IsNotEmpty, Length, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateIf((o) => o.validateRequiredFields || o.password)
  @IsNotEmpty()
  @Length(8, 50)
  password: string;

  @IsNotEmpty()
  full_name: string;
}
