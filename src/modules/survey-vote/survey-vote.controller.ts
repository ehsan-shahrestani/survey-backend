import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { UserVoteDto } from './dto/UserVoteDto';
import { SurveyVoteService } from './survey-vote.service';

@Controller('surveyvote')
export class SurveyVoteController {
  constructor(private voteService :SurveyVoteService)
{}
@Post()
 reciveVote(@Body() uservote :UserVoteDto ){
  return  this.voteService.receiveUserVote(uservote)
 }

}
