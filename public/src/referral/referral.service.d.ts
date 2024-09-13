import { PrismaService } from '../prisma/prisma.service';
export declare class ReferralService {
    private prisma;
    constructor(prisma: PrismaService);
    acceptReferral(referralCode: string, userId: string): Promise<string>;
    claimUserReward(userId: string, mileStone: number): Promise<string>;
    getUserReferrals(userId: string): Promise<{
        _count: {
            referredUsers: number;
        };
    }>;
    getUserClaims(userId: string): Promise<{
        firstMileStone: string | boolean;
        secondMileStone: string | boolean;
        thirdMileStone: string | boolean;
        can: boolean;
    } | {
        can: boolean;
        firstMileStone?: undefined;
        secondMileStone?: undefined;
        thirdMileStone?: undefined;
    }>;
}
