import { ReferralService } from './referral.service';
import { AcceptReferralDto, MileStoneDto } from './dto/accept_referral.dto';
export declare class ReferralController {
    private readonly referralService;
    constructor(referralService: ReferralService);
    acceptReferral(body: AcceptReferralDto, userId: string): Promise<string>;
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
    claimUserReward(body: MileStoneDto, userId: string): Promise<string>;
}
