import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import * as firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as serviceAccountData from '../firebaseServiceAccount.json';
import { Reflector } from '@nestjs/core';

const serviceAccount =
  process.env.NODE_ENV === 'production'
    ? serviceAccountData['prod']
    : serviceAccountData['dev'];

const fbPrivateKey =
  process.env.NODE_ENV === 'production'
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n')
    : serviceAccount['private_key'];

const firebase_params = {
  type: serviceAccount.type,
  project_id: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: fbPrivateKey,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

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
