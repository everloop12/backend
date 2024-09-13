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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const user_service_1 = require("../user/user.service");
const auth_1 = require("firebase-admin/auth");
const prisma_service_1 = require("../prisma/prisma.service");
const mongodb_1 = require("mongodb");
const quest_service_1 = require("../quests/quest.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(userService, prisma, questService) {
        this.userService = userService;
        this.prisma = prisma;
        this.questService = questService;
        this.fbAuth = (0, auth_1.getAuth)();
    }
    async signup(dto) {
        const uid = new mongodb_1.ObjectId().toHexString();
        const user = await this.prisma.$transaction(async (tx) => {
            dto.uid = uid;
            const userDBRecord = await this.userService.createInTransaction(dto, tx);
            try {
                await this.fbAuth.createUser({
                    uid: uid,
                    email: dto.email,
                    password: dto.password,
                    displayName: dto.name,
                    emailVerified: false,
                    disabled: false,
                }).then(async () => {
                    await this.questService.initializeUserQuests(uid);
                });
            }
            catch (error) {
                console.log(error);
                if (error.code == 'auth/email-already-exists') {
                    throw new common_1.ForbiddenException({
                        message: 'Email already exists',
                        error: error,
                    });
                }
                else {
                    throw new common_1.ForbiddenException({
                        message: 'Failed to create user in firebase',
                        error: error,
                    });
                }
            }
            return userDBRecord;
        });
        await this.setFirebaseClaims(uid, client_1.Role.STUDENT);
        return user;
    }
    async setFirebaseClaims(uid, role) {
        try {
            await this.fbAuth.setCustomUserClaims(uid, {
                role: role,
            });
        }
        catch (error) {
            throw new common_1.ForbiddenException({
                message: 'Failed to set user role',
                error: error,
            });
        }
    }
    async setDBRole(uid, role, transaction) {
        try {
            await transaction.user.update({
                where: {
                    id: uid,
                },
                data: {
                    role: role,
                },
            });
        }
        catch (error) {
            throw new common_1.ForbiddenException({
                message: 'Failed to set user role',
                error: error,
            });
        }
    }
    async setUserRole(uid, role) {
        await this.prisma.$transaction(async (tx) => {
            await this.setDBRole(uid, role, tx);
            await this.setFirebaseClaims(uid, role);
        });
    }
    async getUserByToken(token) {
        const user = await this.fbAuth
            .verifyIdToken(token, true)
            .then((decodedToken) => {
            const user = decodedToken;
            return user;
        })
            .catch((error) => {
            if (error.code == 'auth/id-token-revoked') {
                return null;
            }
            else {
                throw error;
            }
        });
        return user;
    }
    async deactivate(uid) {
        await this.fbAuth.updateUser(uid, { disabled: true });
    }
    async changeProfileData(uid, dto) {
        await this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: uid,
                },
                data: {
                    ...dto
                },
            });
            await this.fbAuth.updateUser(uid, {
                displayName: dto.displayName,
            });
            return { success: true };
        });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, prisma_service_1.PrismaService, quest_service_1.QuestSevice])
], AuthService);
//# sourceMappingURL=auth.service.js.map