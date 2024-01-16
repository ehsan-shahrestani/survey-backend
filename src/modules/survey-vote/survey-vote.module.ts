import { Module } from '@nestjs/common';
import { SurveyVoteController } from './survey-vote.controller';
import { SurveyVoteService } from './survey-vote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { VoteEntity } from './entity/vote.entity';

@Module({
  controllers: [SurveyVoteController],
  providers: [SurveyVoteService, UserService],
  imports: [TypeOrmModule.forFeature([UserEntity, VoteEntity])],

})
export class SurveyVoteModule {}
