import { BaseEntity } from 'src/common/baseEntity';
import { ageEnum } from 'src/types/age.enum';
import { GenderEnum } from 'src/types/gender.enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  age: ageEnum;

  @Column()
  gender: GenderEnum;

  @Column()
  isVerified: boolean;

  @Column({ nullable: true })
  verificationToken: string;
}
