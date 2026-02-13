import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
