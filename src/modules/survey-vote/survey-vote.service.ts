import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserVoteDto } from './dto/UserVoteDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { VoteEntity } from './entity/vote.entity';

@Injectable()
export class SurveyVoteService {
  constructor(
    private readonly mailservice: MailerService,
    private readonly userService: UserService,
    @InjectRepository(VoteEntity)
    private readonly voteRepositiry: Repository<VoteEntity>,
  ) {}

  async receiveUserVote(userVoteDto: UserVoteDto) {
    const { age, email, gender, answer } = userVoteDto;
    const createdUser = await this.userService.create({
      age: age,
      email: email,
      gender: gender,
      isVerified: false,
    });

    let newVote = new VoteEntity();
    newVote.answer = answer;
    newVote.uid = createdUser.id;
    await this.voteRepositiry.save(newVote);

    return {};
  }
}
