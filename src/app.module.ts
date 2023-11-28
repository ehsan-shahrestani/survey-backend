import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyVoteModule } from './modules/survey-vote/survey-vote.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './config/orm.config';
import { QuestionModule } from './modules/question/question.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_SERVER_HOST,
        port:  parseInt(process.env.EMAIL_SEVER_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    TypeOrmModule.forRoot(OrmConfig),
    SurveyVoteModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
