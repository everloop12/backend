import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  displayName: string;

  @IsString()
  country: string;

  @IsString()
  university: string;

  uid: string;
}

export class EditProfileDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  displayName: string;

  @IsString()
  country: string;

  @IsString()
  university: string;
}
