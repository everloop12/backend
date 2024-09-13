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
exports.ReferralService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReferralService = exports.ReferralService = class ReferralService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async acceptReferral(referralCode, userId) {
        const referringUser = await this.prisma.user.findUnique({
            where: {
                referral_code: referralCode
            }
        });
        if (!referringUser) {
            throw new common_1.NotFoundException('Referral code not found');
        }
        await this.prisma.user.update({
            where: {
                id: referringUser.id
            },
            data: {
                referredUsers: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        return "Referral accepted";
    }
    async claimUserReward(userId, mileStone) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                referredUsers: true
            }
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.lastPaymentAt) {
            const target = new Date(user.lastPackageExpiry);
            let date = new Date(Date.now());
            if (target > date) {
                date = target;
            }
            date.setDate(date.getDate() + (15 * mileStone));
            switch (mileStone) {
                case 1:
                    if (user.firstMilesStone) {
                        throw new common_1.NotFoundException('Reward already claimed');
                    }
                    if (user.referredUsers.length < 5) {
                        throw new common_1.NotFoundException('no reward to be claimed');
                    }
                    await this.prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            firstMilesStone: true,
                            lastPackageExpiry: date,
                        }
                    });
                    break;
                case 2:
                    if (user.secondMilesStone) {
                        throw new common_1.NotFoundException('Reward already claimed');
                    }
                    if (user.referredUsers.length < 10) {
                        throw new common_1.NotFoundException('no reward to be claimed');
                    }
                    await this.prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            secondMilesStone: true,
                            lastPackageExpiry: date,
                        }
                    });
                    break;
                case 3:
                    if (user.thirdMilesStone) {
                        throw new common_1.NotFoundException('Reward already claimed');
                    }
                    if (user.referredUsers.length < 15) {
                        throw new common_1.NotFoundException('no reward to be claimed');
                    }
                    await this.prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            thirdMilesStone: true,
                            lastPackageExpiry: date,
                        }
                    });
                    break;
                default:
                    throw new common_1.NotFoundException('Milestone not found');
            }
        }
        else if (!user) {
            throw new common_1.NotFoundException('No rewards to claim');
        }
        return "Reward claimed";
    }
    async getUserReferrals(userId) {
        return await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                _count: {
                    select: {
                        referredUsers: true
                    }
                }
            }
        });
    }
    async getUserClaims(userId) {
        const data = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                firstMilesStone: true,
                secondMilesStone: true,
                thirdMilesStone: true,
                lastPaymentAt: true,
                referredUsers: true,
            }
        });
        if (data.lastPaymentAt) {
            return ({
                firstMileStone: data.firstMilesStone ? 'claimed' : data.referredUsers.length >= 5,
                secondMileStone: data.secondMilesStone ? 'claimed' : data.referredUsers.length >= 10,
                thirdMileStone: data.secondMilesStone ? 'claimed' : data.referredUsers.length >= 15,
                'can': true
            });
        }
        else
            return ({ 'can': false });
    }
};
exports.ReferralService = ReferralService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReferralService);
//# sourceMappingURL=referral.service.js.map