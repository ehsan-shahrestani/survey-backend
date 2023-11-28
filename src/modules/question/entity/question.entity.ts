// question.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionOptionEntity } from './question-option.entity';
import { BaseEntity } from 'src/common/baseEntity';

@Entity({name:'question'})
export class QuestionEntity extends BaseEntity {
  @Column()
  text: string;

  @OneToMany(() => QuestionOptionEntity, option => option.question)
  options: QuestionOptionEntity[];
}