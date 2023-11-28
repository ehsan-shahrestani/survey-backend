import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionEntity } from './entity/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionOptionEntity } from './entity/question-option.entity';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [TypeOrmModule.forFeature([QuestionEntity, QuestionOptionEntity])],
  exports: [QuestionService],

})

export class QuestionModule {}
