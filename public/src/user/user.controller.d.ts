import { Role } from '@prisma/client';
import { UserService } from './user.service';
import { QuestSevice } from 'src/quests/quest.service';
export declare class UserController {
    private readonly userService;
    private readonly qusetService;
    constructor(userService: UserService, qusetService: QuestSevice);
    getUserInfo(userId: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        email: string;
        role: Role;
        country: string;
        university: string;
        name: string;
        lastName: string;
        displayName: string;
        streak: number;
        referral_code: string;
        referredById: string;
        firstMilesStone: boolean;
        secondMilesStone: boolean;
        thirdMilesStone: boolean;
        xp: number;
        lastPaymentAt: Date;
        lastPackageExpiry: Date;
        lastPackageTransactionId: string;
        createdAt: Date;
        updatedAt: Date;
        anon: boolean;
        focus: boolean;
    }, unknown> & {}>;
    adjustProfileSettings(userId: string, dto: {
        data: {
            focus: boolean;
            anon: boolean;
        };
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        email: string;
        role: Role;
        country: string;
        university: string;
        name: string;
        lastName: string;
        displayName: string;
        streak: number;
        referral_code: string;
        referredById: string;
        firstMilesStone: boolean;
        secondMilesStone: boolean;
        thirdMilesStone: boolean;
        xp: number;
        lastPaymentAt: Date;
        lastPackageExpiry: Date;
        lastPackageTransactionId: string;
        createdAt: Date;
        updatedAt: Date;
        anon: boolean;
        focus: boolean;
    }, unknown> & {}>;
    deleteUser(userId: string): Promise<void>;
    getAnalytics(userId: string): Promise<void>;
    getStreak(userId: string): Promise<void>;
    getSubscriptionStatus(userId: string): Promise<{
        lastPaymentAt: Date;
        lastPackageExpiry: Date;
    }>;
    getHistory(userId: string, page: number): Promise<({
        question: {
            categories: (import("@prisma/client/runtime").GetResult<{
                id: string;
                name: string;
                questionIDs: string[];
                averageRating: number;
                createdAt: Date;
                updatedAt: Date;
            }, unknown> & {})[];
            tags: (import("@prisma/client/runtime").GetResult<{
                id: string;
                name: string;
                questionIDs: string[];
                createdAt: Date;
                updatedAt: Date;
            }, unknown> & {})[];
        } & import("@prisma/client/runtime").GetResult<{
            id: string;
            question: string;
            createdAt: Date;
            updatedAt: Date;
            tagIds: string[];
            references: string[];
            categoryIds: string[];
        }, unknown> & {
            choices: ({
                text: string;
                isCorrect: boolean;
                index: number;
            } & {})[];
        };
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        answer: import(".prisma/client").AnswerEnum;
        index: number;
        deleted: boolean;
        isCorrect: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    getUserAnswers(userId: string): Promise<({
        question: import("@prisma/client/runtime").GetResult<{
            id: string;
            question: string;
            createdAt: Date;
            updatedAt: Date;
            tagIds: string[];
            references: string[];
            categoryIds: string[];
        }, unknown> & {
            choices: ({
                text: string;
                isCorrect: boolean;
                index: number;
            } & {})[];
        };
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        answer: import(".prisma/client").AnswerEnum;
        index: number;
        deleted: boolean;
        isCorrect: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    getUserList(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        email: string;
        role: Role;
        country: string;
        university: string;
        name: string;
        lastName: string;
        displayName: string;
        streak: number;
        referral_code: string;
        referredById: string;
        firstMilesStone: boolean;
        secondMilesStone: boolean;
        thirdMilesStone: boolean;
        xp: number;
        lastPaymentAt: Date;
        lastPackageExpiry: Date;
        lastPackageTransactionId: string;
        createdAt: Date;
        updatedAt: Date;
        anon: boolean;
        focus: boolean;
    }, unknown> & {})[]>;
    getAllUsers(page: number): Promise<{
        email: string;
        name: string;
        id: string;
        xp: number;
        displayName: string;
        country: string;
        university: string;
        anon: boolean;
        quests: (import("@prisma/client/runtime").GetResult<{
            id: string;
            uid: string;
            tag: import(".prisma/client").QuestTypeEnum;
            frequency: import(".prisma/client").QuestFrequencyEnum;
            rotation: number;
            ref: string;
            currentProgress: number;
            goal: number;
            reward: number;
            cleared: boolean;
        }, unknown> & {})[];
    }[]>;
    getUserInfoAdmin(userId: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        email: string;
        role: Role;
        country: string;
        university: string;
        name: string;
        lastName: string;
        displayName: string;
        streak: number;
        referral_code: string;
        referredById: string;
        firstMilesStone: boolean;
        secondMilesStone: boolean;
        thirdMilesStone: boolean;
        xp: number;
        lastPaymentAt: Date;
        lastPackageExpiry: Date;
        lastPackageTransactionId: string;
        createdAt: Date;
        updatedAt: Date;
        anon: boolean;
        focus: boolean;
    }, unknown> & {}>;
    getOtherUserInfo(userId: string): Promise<{
        id: string;
        xp: number;
        name: string;
        displayName: string;
        email: string;
        country: string;
        university: string;
    }>;
    getUserXp(userId: string): Promise<{
        xp: number;
    }>;
}
