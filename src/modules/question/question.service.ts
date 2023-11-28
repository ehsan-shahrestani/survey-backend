import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,

    ){}
    
    async getAllQuestionsWithOptions(): Promise<QuestionEntity[]> {
        try {
            const data = await this.questionRepository.find({ relations: ['options'] });
            
            return data
        }catch {

        }
      }
}
