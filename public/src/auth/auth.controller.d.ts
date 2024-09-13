import { AuthService } from './auth.service';
import { EditProfileDto, SignUpDto } from './dto';
import { Role } from '@prisma/client';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    editProfile(uid: string, dto: EditProfileDto): Promise<void>;
    setRole(uid: string, role: Role): Promise<void>;
}
