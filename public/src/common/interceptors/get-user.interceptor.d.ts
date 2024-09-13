import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
export declare class GetUserInterceptor implements NestInterceptor {
    private readonly authService;
    constructor(authService: AuthService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
}
