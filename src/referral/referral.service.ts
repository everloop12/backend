import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { last } from 'rxjs';

@Injectable()
export class ReferralService {
    constructor(private prisma: PrismaService) { }

    public async acceptReferral(referralCode: string, userId: string) {
        const referringUser = await this.prisma.user.findUnique({
            where: {
                referral_code: referralCode
            }
        });

        if (!referringUser) {
            throw new NotFoundException('Referral code not found');
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

    public async claimUserReward(userId: string, mileStone: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                referredUsers: true
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (user.lastPaymentAt) {
            const target = new Date(user.lastPackageExpiry);

            let date = new Date(Date.now())
            if (target > date) {
                date = target;
            }
            date.setDate(date.getDate() + (15 * mileStone));
            switch (mileStone) {
                case 1:
                    if (user.firstMilesStone) {
                        throw new NotFoundException('Reward already claimed');
                    }
                    if (user.referredUsers.length < 5) {
                        throw new NotFoundException('no reward to be claimed');
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
                        throw new NotFoundException('Reward already claimed');
                    }
                    if (user.referredUsers.length < 10) {
                        throw new NotFoundException('no reward to be claimed');
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
                        throw new NotFoundException('Reward already claimed');
                    }
                    if (user.referredUsers.length < 15) {
                        throw new NotFoundException('no reward to be claimed');
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
                    throw new NotFoundException('Milestone not found');
            }
        }
        else
            if (!user) {
                throw new NotFoundException('No rewards to claim');
            }

        return "Reward claimed";
    }


    public async getUserReferrals(userId: string) {
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
        })
    }

    public async getUserClaims(userId: string) {
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
        })

        if (data.lastPaymentAt) {
            return ({
                firstMileStone: data.firstMilesStone ? 'claimed' : data.referredUsers.length >= 5,
                secondMileStone: data.secondMilesStone ? 'claimed' : data.referredUsers.length >= 10,
                thirdMileStone: data.secondMilesStone ? 'claimed' : data.referredUsers.length >= 15,
                'can': true
            })
        }
        else
            return ({ 'can': false })
    }


}
