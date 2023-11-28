import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { error } from 'console';
import { CreateUserdto } from './dto/createUserDto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailservice: MailerService,
  ) {}

  async create(userDto: CreateUserdto) {
    const { age, email, gender } = userDto;
    const user = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (user)
      throw new HttpException(
        { message: 'Email already exist.' },
        HttpStatus.BAD_REQUEST,
      );

    let newUser = new UserEntity();
    newUser.age = age;
    newUser.email = email;
    newUser.gender = gender;
    newUser.isVerified = false;

    try {
      await this.mailservice.sendMail({
        to: email,
        text: 'hi testslkls',
        subject: '2o31po23',
      });
    } catch (error) {
      console.log(error);
    }

    const savedUser = this.userRepository.save(newUser);
    return savedUser;
  }
}
