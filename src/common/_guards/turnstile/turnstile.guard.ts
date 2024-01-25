import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

interface ITurnstileResponse {
  success: boolean;
  challenge_ts: Date;
  hostname: string;
  error_codes: any[];
  action: string;
  cdata: string;
}

@Injectable()
export class TurnstileGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();
    let dataResponse: ITurnstileResponse;
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    let formData = new FormData();
    formData.append('secret', process.env.TURNSTILE_SECRET);
    formData.append('response', body.token);
    this.httpService.post<ITurnstileResponse>(url, formData).subscribe({
      next: (out) => {
        if (!out.data.success) {
          throw new HttpException(
            { message: 'Invalid Turnstile Token' },
            HttpStatus.BAD_REQUEST,
          );
        } else return true;
      },
      error: () => {},
    });

    return dataResponse?.success;
  }
}
