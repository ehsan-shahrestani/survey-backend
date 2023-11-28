import { ageEnum } from "src/types/age.enum";
import { GenderEnum } from "src/types/gender.enum";

export class CreateUserdto {
    age:ageEnum;
    gender:GenderEnum;
    email:string;
    isVerified:boolean
}