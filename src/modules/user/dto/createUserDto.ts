import { ageEnum } from 'src/types/age.enum';
import { GenderEnum } from 'src/types/gender.enum';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserdto {
  age: ageEnum;
  gender: GenderEnum;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  isVerified: boolean;
}
