import { Controller, Get, Logger } from '@nestjs/common';
import { QuestionService } from './question.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getAllQuestionsWithOptions(@I18n() i18n: I18nContext) {
    const lang = i18n.lang;
    return this.questionService.getAllQuestionsWithOptions(lang);
  }
}
