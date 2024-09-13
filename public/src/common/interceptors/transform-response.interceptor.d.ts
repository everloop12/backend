import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface BaseResponse<T> {
    data: T;
}
export interface ArrayResponse<T> extends BaseResponse<Array<T>> {
    total: number;
}
type Response<T> = BaseResponse<T> | ArrayResponse<T>;
export declare class TransformResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}
export {};
