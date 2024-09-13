import { Prisma, User, Role } from '@prisma/client';
import { SignUpDto } from 'src/auth/dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    getUserData(arg0: string): void;
    constructor(prisma: PrismaService);
    findOne(email: string, isEmailVerified: boolean): Promise<import("@prisma/client/runtime").GetResult<{
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
    createInTransaction(dto: SignUpDto, transaction: Prisma.TransactionClient): Promise<User>;
    getOtherUserInfo(uid: string): Promise<{
        id: string;
        xp: number;
        name: string;
        displayName: string;
        email: string;
        country: string;
        university: string;
    }>;
    getInfo(userId: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserAnswers(uid: string): Promise<({
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
    getXp(uid: string): Promise<{
        xp: number;
    }>;
    deleteUser(uid: string): Promise<void>;
    changeSettings(uid: string, dto: {
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
    getStreak(uid: string): Promise<void>;
    getAnalytics(uid: string): Promise<void>;
    getSubscriptionStatus(uid: string): Promise<{
        lastPaymentAt: Date;
        lastPackageExpiry: Date;
    }>;
    getHistory(uid: string, page: number): Promise<({
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
    updateStreak(userId: string, correct: boolean): Promise<number>;
    getAll(page?: number): Promise<{
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
}
