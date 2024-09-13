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
exports.EmailVerifiedGuard = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const core_1 = require("@nestjs/core");
let EmailVerifiedGuard = exports.EmailVerifiedGuard = class EmailVerifiedGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const { user } = context.switchToHttp().getRequest();
        const isVerified = user.email_verified;
        if (!isVerified) {
            throw new exceptions_1.ForbiddenException('Email not verified');
        }
        return isVerified;
    }
};
exports.EmailVerifiedGuard = EmailVerifiedGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], EmailVerifiedGuard);
//# sourceMappingURL=email-verified.guard.js.map