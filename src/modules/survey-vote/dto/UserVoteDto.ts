import { ageEnum } from "src/types/age.enum"
import { GenderEnum } from "src/types/gender.enum"

 export class UserVoteDto {
    age: ageEnum
    answer: number
    email: string
    gender: GenderEnum
 }