import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import * as firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private defaultApp: firebase.app.App;

  constructor(private readonly reflector: Reflector) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });

    // Define Firebase parameters, ensure private key handling
    const fbPrivateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')  // Replace \\n with actual newline
      : null;

    const firebase_params = {
      type: process.env.FIREBASE_TYPE,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: fbPrivateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: process.env.FIREBASE_AUTH_URI,
      tokenUri: process.env.FIREBASE_TOKEN_URI,
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };

    // Initialize Firebase Admin SDK
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }

  async validate(request: Request, token: string) {
    const isPublic = request['isPublic'];

    const firebaseUser: DecodedIdToken = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        if (isPublic) {
          return null;
        }
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      if (isPublic) {
        return true;
      }
      throw new UnauthorizedException();
    }

    return firebaseUser;
  }
}
