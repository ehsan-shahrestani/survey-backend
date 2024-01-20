import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { error } from 'console';
import { CreateUserdto } from './dto/createUserDto';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailservice: MailerService,
    private readonly i18n: I18nService
  ) {}

  async create(userDto: CreateUserdto) {
    const { age, email, gender } = userDto;
    const user = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (user)
      throw new HttpException(
        { message: this.i18n.t('tr.EMAILEXSITS',{ lang:   I18nContext.current().lang }) },
        HttpStatus.BAD_REQUEST,
      );

    let newUser = new UserEntity();
    const verificationToken = this.generateVerificationToken();
    newUser.verificationToken = verificationToken;
    newUser.age = age;
    newUser.email = email;
    newUser.gender = gender;
    newUser.isVerified = false;

    setImmediate(async () => {
      await this.mailservice.sendMail({
        to: email,
        template: 'verify-email.html',
        subject: 'Email Verification',
        context: {
          verificationLink: `http://84.46.252.48/en/verify-email/${verificationToken}`,
        },
      });
    });

    const savedUser = this.userRepository.save(newUser);
    return savedUser;
  }
  private generateVerificationToken(): string {
    const token = crypto.randomBytes(16).toString('hex');
    return token;
  }

  async verifyEmail(token: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { verificationToken: token },
    });

    if (user) {
      user.isVerified = true;
      user.verificationToken = null; // Optional: Clear the verification token after successful verification
      await this.userRepository.save(user);
      return true;
    }

    return false;
  }
}
