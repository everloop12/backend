import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { EditProfileDto, SignUpDto } from './dto';
import { Auth, getAuth } from 'firebase-admin/auth';
import { PrismaService } from '../prisma/prisma.service';
import { ObjectId } from 'mongodb';
import { QuestSevice } from 'src/quests/quest.service';

@Injectable()
export class AuthService {
  fbAuth: Auth;
  constructor(private userService: UserService, private prisma: PrismaService, private questService: QuestSevice) {
    this.fbAuth = getAuth();
  }

  async signup(dto: SignUpDto) {
    const uid = new ObjectId().toHexString();

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
      } catch (error) {
        console.log(error);
        // get message from firebase exception
        if (error.code == 'auth/email-already-exists') {
          throw new ForbiddenException({
            message: 'Email already exists',
            error: error,
          });
        } else {
          throw new ForbiddenException({
            message: 'Failed to create user in firebase',
            error: error,
          });
        }
      }

      return userDBRecord;
    });
    await this.setFirebaseClaims(uid, Role.STUDENT);
    return user;
  }

  async setFirebaseClaims(uid: string, role: Role) {
    try {
      await this.fbAuth.setCustomUserClaims(uid, {
        role: role,
      });
    } catch (error) {
      throw new ForbiddenException({
        message: 'Failed to set user role',
        error: error,
      });
    }
  }

  async setDBRole(
    uid: string,
    role: Role,
    transaction: Prisma.TransactionClient,
  ): Promise<void> {
    try {
      await transaction.user.update({
        where: {
          id: uid,
        },
        data: {
          role: role,
        },
      });
    } catch (error) {
      throw new ForbiddenException({
        message: 'Failed to set user role',
        error: error,
      });
    }
  }

  async setUserRole(uid: string, role: Role) {
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
        } else {
          throw error;
        }
      });
    return user;
  }

  async deactivate(uid: string) {
    await this.fbAuth.updateUser(uid, { disabled: true });
  }



  async changeProfileData(uid: string, dto: EditProfileDto) {
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


  // async changeEmail(uid: string, email: string) {
  //   await this.prisma.$transaction(async (tx) => {
  //     try {
  //       let userData = await tx.user.update({
  //         where: {
  //           id: uid,
  //         },
  //         data: {
  //           email: email,
  //         },
  //       });
  //     } catch (error) {
  //       if (error.code === 'P2002') {
  //         throw new ConflictException({
  //           message: 'Email already used by another user',
  //           error: 'Already exists in database',
  //         });
  //       } else {
  //         throw new BadRequestException({
  //           message: 'Failed to update user in database.',
  //           error: 'Error in updating user in DB',
  //         });
  //       }
  //     }

  //     try {
  //       await this.fbAuth.updateUser(uid, {
  //         email: email,
  //       });
  //     } catch (error) {
  //       if (error.code == 'auth/email-already-exists') {
  //         throw new ForbiddenException({
  //           message: 'Email already used by another user',
  //           error: error,
  //         });
  //       } else {
  //         throw new ForbiddenException({
  //           message: 'Failed to update user',
  //           error: error,
  //         });
  //       }
  //     }

  //     return userData;
  //   });
  // }
}
