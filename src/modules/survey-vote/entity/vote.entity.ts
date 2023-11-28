import { BaseEntity } from "src/common/baseEntity";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";



@Entity()
export class VoteEntity extends BaseEntity {

  @Column()
  answer :number;
   

  @Column()
  uid: number; // assuming uid is a column in the Vote table

  // Unidirectional One-to-One relationship with User
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'uid' }) 
  user: any;

}