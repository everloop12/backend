import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;
    response.on('close', () => {
      const { statusCode } = response;
      //   get bearer token from request header

      const token = request.headers.authorization?.split(' ')[1] || null;
      const hasToken = token ? true : false;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${ip} ${hasToken}`,
      );

      // if stripe webhook dont log body
      if (originalUrl.includes('/stripe/webhook')) {
        return;
      }
      
      this.logger.log(body);
    });

    next();
  }
}
