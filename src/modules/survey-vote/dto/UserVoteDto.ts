import { ageEnum } from 'src/types/age.enum';
import { GenderEnum } from 'src/types/gender.enum';
import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class UserVoteDto {
  @IsNotEmpty()
  answer: number;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsOptional()
  gender: GenderEnum;
  @IsOptional()
  age: ageEnum;
}
