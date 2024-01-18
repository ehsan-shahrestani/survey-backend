// question.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionOptionEntity } from './question-option.entity';
import { BaseEntity } from 'src/common/baseEntity';
import { MultiLanguage } from 'src/types/multi-language';

@Entity({name:'question'})
export class QuestionEntity extends BaseEntity {
  @Column({type:'jsonb'})
  text: MultiLanguage[];

  @OneToMany(() => QuestionOptionEntity, option => option.question)
  options: QuestionOptionEntity[];
}