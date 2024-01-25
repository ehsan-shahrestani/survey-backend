import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UserVoteDto } from './dto/UserVoteDto';
import { SurveyVoteService } from './survey-vote.service';
import { TurnstileGuard } from 'src/common/_guards/turnstile/turnstile.guard';

@Controller('surveyvote')
export class SurveyVoteController {
  constructor(private voteService: SurveyVoteService) {}

  @Post()
  @UseGuards(TurnstileGuard)
  reciveVote(@Body() uservote: UserVoteDto) {
    return this.voteService.receiveUserVote(uservote);
  }
}
