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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const nanoid_1 = require("nanoid");
let UserService = exports.UserService = class UserService {
    getUserData(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(email, isEmailVerified) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        user['emailVerfied'] = isEmailVerified;
        return user;
    }
    async createInTransaction(dto, transaction) {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const generator = (0, nanoid_1.customAlphabet)(alphabet, 8);
        const referralCode = generator();
        try {
            return await transaction.user.create({
                data: {
                    id: dto.uid,
                    email: dto.email,
                    country: dto.country,
                    university: dto.university,
                    name: dto.name,
                    displayName: dto.displayName,
                    role: client_1.Role.STUDENT,
                    referral_code: referralCode,
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                if (error.meta.target.includes('displayName_1')) {
                    throw new common_1.ForbiddenException({
                        message: 'Display name already in use',
                        error: error,
                    });
                }
                if (error.meta.target.includes('referral_code')) {
                    throw new common_1.ForbiddenException({
                        message: 'Referral code collision. Please try again.',
                        error: error,
                    });
                }
                throw new common_1.ForbiddenException({
                    message: 'Email already exists',
                    error: error,
                });
            }
            throw new common_1.ForbiddenException({
                message: 'Failed to write user record to database',
                error: error,
            });
        }
    }
    async getOtherUserInfo(uid) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    id: uid,
                },
                select: {
                    id: true,
                    xp: true,
                    name: true,
                    displayName: true,
                    email: true,
                    country: true,
                    university: true,
                },
            });
        }
        catch (e) {
            throw e;
        }
    }
    async getInfo(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            return user;
        }
        catch (e) {
            throw e;
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            return user;
        }
        catch (e) {
            throw e;
        }
    }
    async getUserAnswers(uid) {
        return await this.prisma.answer.findMany({
            include: {
                question: true,
            },
            where: {
                userId: uid,
            },
        });
    }
    async getXp(uid) {
        return await this.prisma.user.findFirst({
            select: {
                xp: true
            },
            where: {
                id: uid
            },
        });
    }
    async deleteUser(uid) {
        this.prisma.$transaction(async (tx) => {
            try {
                return await tx.user.delete({
                    where: {
                        id: uid
                    }
                });
            }
            catch (error) { }
        });
    }
    async changeSettings(uid, dto) {
        return await this.prisma.user.update({
            where: {
                id: uid
            },
            data: {
                focus: dto.data.focus,
                anon: dto.data.anon,
            }
        });
    }
    async getStreak(uid) {
        const streak = await this.prisma.user.findFirst({
            where: {
                id: uid
            },
            select: {
                streak: true
            }
        });
    }
    async getAnalytics(uid) {
        const answers = await this.prisma.category.findMany({
            include: {
                questions: {
                    where: {
                        answers: {
                            some: {
                                userId: uid
                            }
                        }
                    }
                }
            }
        });
    }
    async getSubscriptionStatus(uid) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: uid
            },
            select: {
                lastPaymentAt: true,
                lastPackageExpiry: true,
            }
        });
        return user;
    }
    async getHistory(uid, page) {
        const answers = await this.prisma.answer.findMany({
            where: {
                userId: uid
            },
            include: {
                question: {
                    include: {
                        categories: true,
                        tags: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 40,
            skip: (page - 1) * 40,
        });
        return answers;
    }
    async getUserList() {
        return await this.prisma.user.findMany({});
    }
    async updateStreak(userId, correct) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        let xp = user.xp;
        const streak = correct ? (user?.streak || 0) + 1 : 0;
        if (correct) {
            if (streak > 3) {
                xp += 3;
            }
            else
                xp += 2;
        }
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                streak: streak,
                xp: xp
            }
        });
        return streak;
    }
    async getAll(page) {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                xp: true,
                name: true,
                displayName: true,
                email: true,
                country: true,
                university: true,
                anon: true,
                quests: {
                    where: {
                        frequency: "BADGE"
                    }
                }
            },
            where: {
                role: 'STUDENT'
            },
            take: page ? 20 : undefined,
            skip: page ? (page - 1) * 20 : undefined,
        });
        const returnValue = users.map((x) => {
            return x.anon ?
                { ...x, email: "anonymous user", name: x.displayName ?? "anonymous user" } :
                { ...x, name: x.name ?? x.email };
        });
        return returnValue;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map