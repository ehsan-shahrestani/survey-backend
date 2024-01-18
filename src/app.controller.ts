import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async getHello(@I18n() i18n: I18nContext) {
     

      const otion =[
        {lang:'en' , title : 'hello'},
        {lang:'de' , title : 'hallo'},
        {lang:'tr' , title : 'truehallo'},
      ]
     
      let output = otion.find(t => t.lang == i18n.lang)


    return {message:output ,lang:i18n.lang}
  }
}
