import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GetUserInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token =
      request.headers.authorization &&
      request.headers.authorization.split(' ')[1];

    if (!token) {
      request.user = null;
      return next.handle();
    }

    const user = await this.authService.getUserByToken(token);

    request.user = user;
    return next.handle();
  }
}
