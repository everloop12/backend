"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const firebase = require("firebase-admin");
const passport_firebase_jwt_1 = require("passport-firebase-jwt");
const serviceAccountData = require("../firebaseServiceAccount.json");
const core_1 = require("@nestjs/core");
const serviceAccount = process.env.NODE_ENV === 'production'
    ? serviceAccountData['prod']
    : serviceAccountData['dev'];
const fbPrivateKey = process.env.NODE_ENV === 'production'
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
let FirebaseAuthStrategy = exports.FirebaseAuthStrategy = class FirebaseAuthStrategy extends (0, passport_1.PassportStrategy)(passport_firebase_jwt_1.Strategy, 'firebase-auth') {
    constructor(reflector) {
        super({
            jwtFromRequest: passport_firebase_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
        });
        this.reflector = reflector;
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_params),
        });
    }
    async validate(request, token) {
        const isPublic = request['isPublic'];
        const firebaseUser = await this.defaultApp
            .auth()
            .verifyIdToken(token, true)
            .catch((err) => {
            if (isPublic) {
                return null;
            }
            throw new common_1.UnauthorizedException(err.message);
        });
        if (!firebaseUser) {
            if (isPublic) {
                return true;
            }
            throw new common_1.UnauthorizedException();
        }
        return firebaseUser;
    }
};
exports.FirebaseAuthStrategy = FirebaseAuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], FirebaseAuthStrategy);
//# sourceMappingURL=firebase.strategy.js.map