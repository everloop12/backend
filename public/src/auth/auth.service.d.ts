import { Prisma, Role } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { EditProfileDto, SignUpDto } from './dto';
import { Auth } from 'firebase-admin/auth';
import { PrismaService } from '../prisma/prisma.service';
import { QuestSevice } from 'src/quests/quest.service';
export declare class AuthService {
    private userService;
    private prisma;
    private questService;
    fbAuth: Auth;
    constructor(userService: UserService, prisma: PrismaService, questService: QuestSevice);
    signup(dto: SignUpDto): Promise<import("@prisma/client/runtime").GetResult<{
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
    setFirebaseClaims(uid: string, role: Role): Promise<void>;
    setDBRole(uid: string, role: Role, transaction: Prisma.TransactionClient): Promise<void>;
    setUserRole(uid: string, role: Role): Promise<void>;
    getUserByToken(token: any): Promise<any>;
    deactivate(uid: string): Promise<void>;
    changeProfileData(uid: string, dto: EditProfileDto): Promise<void>;
}
