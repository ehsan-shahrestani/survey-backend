import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserVoteDto } from './dto/UserVoteDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class SurveyVoteService {
  constructor(
    private readonly mailservice: MailerService,
    private readonly userService: UserService,
  ) {}

  async receiveUserVote(userVoteDto: UserVoteDto) {
    const { age, email, gender } = userVoteDto;
    const createdUser = this.userService.create({
      age: age,
      email: email,
      gender: gender,
      isVerified: false,
    });


    return createdUser;
  }
}
