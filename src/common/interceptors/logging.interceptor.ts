import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    if (ctx.getType() === 'http') {
      const req = ctx.switchToHttp().getRequest<Request>();
      const method = req.method;
      const url = req.url;

      return next.handle().pipe(
        tap({
          next: (data) => this.logger.log(data),
          error: (err) => this.logger.error(`${err} ${method} ${url}`),
        }),
      );
    }
    return next.handle();
  }
}
