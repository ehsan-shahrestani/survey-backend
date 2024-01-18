// question-option.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { BaseEntity } from 'src/common/baseEntity';
import { MultiLanguage } from 'src/types/multi-language';

@Entity({name:'questionOption'})
export class QuestionOptionEntity extends BaseEntity {
  @Column({type:'json'})
  text: MultiLanguage[];

  @Column()
  icon:string

  @ManyToOne(() => QuestionEntity, question => question.options)
  question: QuestionEntity;
}