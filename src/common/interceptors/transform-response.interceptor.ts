import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BaseResponse<T> {
  data: T;
}

export interface ArrayResponse<T> extends BaseResponse<Array<T>> {
  total: number;
}

type Response<T> = BaseResponse<T> | ArrayResponse<T>;

export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // if response is stripe webhook, return raw body
    const request = ctx.switchToHttp().getRequest();
    if (request.url.includes('/paymob/webhook')) {
      return next.handle();
    }

    // encode response in a standard format
    return next.handle().pipe(
      map((data) => {
        // check if data is type PaginatedResult
        if (data?.hasOwnProperty('data') || false && data?.hasOwnProperty('meta') || false) {
          const { data: d, meta } = data as any;
          return {
            success: true,
            status: ctx.switchToHttp().getResponse().statusCode,
            data: d,
            meta,
          };
        }

        return {
          success: true,
          status: ctx.switchToHttp().getResponse().statusCode,
          data,
          total: Array.isArray(data) ? data.length : undefined,
        };
      }),
    );
  }
}
