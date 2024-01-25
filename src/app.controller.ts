import { Controller, Get, Ip } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/ip')
  getIpAddress(@Ip() ip) {
    console.log(ip);
    return ip;
  }
}
