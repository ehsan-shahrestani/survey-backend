import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { Repository } from 'typeorm';
import { IQuestion, IQuestionOptions } from 'src/types/question.interface';
import { QuestionOptionEntity } from './entity/question-option.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async getAllQuestionsWithOptions(lang: string): Promise<IQuestion[]> {
    try {
      const data = await this.questionRepository.find({
        relations: ['options'],
      });
      const newData: IQuestion[] = [];

      data.forEach((t) => {
        newData.push({
          id: t.id,
          created_at: t.created_at,
          text: t.text.find((i) => i.language == lang).title,
          options: this.createNewQuestionOptionWithLanguage(t.options, lang),
        });
      });

      return newData;
    } catch {}
  }

  createNewQuestionOptionWithLanguage(
    data: QuestionOptionEntity[],
    lang: string,
  ): IQuestionOptions[] {
    let newOptions: IQuestionOptions[] = [];
    data.forEach((t) => {
      newOptions.push({
        id: t.id,
        icon: t.icon,
        created_at: t.created_at,
        text: t.text.find((i) => i.language == lang).title,
      });
    });
    return newOptions;
  }
}
