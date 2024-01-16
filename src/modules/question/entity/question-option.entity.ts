// question-option.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { BaseEntity } from 'src/common/baseEntity';

@Entity({name:'questionOption'})
export class QuestionOptionEntity extends BaseEntity {
  @Column()
  text: string;

  @Column()
  imageBase64:string

  @ManyToOne(() => QuestionEntity, question => question.options)
  question: QuestionEntity;
}