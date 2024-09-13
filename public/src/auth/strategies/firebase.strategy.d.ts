import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import { Strategy } from 'passport-firebase-jwt';
import { Reflector } from '@nestjs/core';
declare const FirebaseAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class FirebaseAuthStrategy extends FirebaseAuthStrategy_base {
    private readonly reflector;
    private defaultApp;
    constructor(reflector: Reflector);
    validate(request: Request, token: string): Promise<true | DecodedIdToken>;
}
export {};
