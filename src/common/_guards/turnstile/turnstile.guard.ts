import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable, catchError, firstValueFrom } from 'rxjs';


@Injectable()
export class TurnstileGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    let formData = new FormData();
    formData.append('secret', process.env.TURNSTILE_SECRET);
    formData.append('response', body.token);

    const { data } = await firstValueFrom(
      this.httpService.post(url, formData).pipe(
        catchError((error) => {
          throw `An error happened. Msg: ${JSON.stringify(
            error?.response?.data,
          )}`;
        }),
      ),
    );
    return data?.success;
  }
}
