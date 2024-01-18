import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyVoteModule } from './modules/survey-vote/survey-vote.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './config/orm.config';
import { QuestionModule } from './modules/question/question.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { AuthModule } from './modules/auth/auth.module';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
        
      },
      resolvers:[
        new AcceptLanguageResolver()
      ]
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SEVER_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      template: {
        dir: process.cwd() + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    TypeOrmModule.forRoot(OrmConfig),
    SurveyVoteModule,
    QuestionModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
