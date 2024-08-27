import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User, Role } from '@prisma/client';
import { SignUpDto } from 'src/auth/dto';
import { PrismaService } from '../prisma/prisma.service';
// import nanoid
import { customAlphabet } from 'nanoid';

@Injectable()
export class UserService {
  getUserData(arg0: string) {
      throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) { }

  async findOne(email: string, isEmailVerified: boolean) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    user['emailVerfied'] = isEmailVerified;
    return user;
  }

  async createInTransaction(
    dto: SignUpDto,
    transaction: Prisma.TransactionClient,
  ): Promise<User> {
    // generate a referral code
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const generator = customAlphabet(alphabet, 8);

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
          role: Role.STUDENT,
          referral_code: referralCode,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // check collision on referral code
        if (error.meta.target.includes('displayName_1')) {
          throw new ForbiddenException({
            message: 'Display name already in use',
            error: error,
          });
        }

        if (error.meta.target.includes('referral_code')) {
          throw new ForbiddenException({
            message: 'Referral code collision. Please try again.',
            error: error,
          });
        }

        throw new ForbiddenException({
          message: 'Email already exists',
          error: error,
        });
      }

      throw new ForbiddenException({
        message: 'Failed to write user record to database',
        error: error,
      });
    }
  }

  async getOtherUserInfo(uid: string) {
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
          // answers: true,
        },
      });

    } catch (e) {
      throw e;
    }
  }

  async getInfo(userId: string): Promise<User> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return user;
    } catch (e) {
      throw e;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      return user;
    } catch (e) {
      throw e;
    }
  }

  async getUserAnswers(uid: string) {
    return await this.prisma.answer.findMany({
      include: {
        question: true,
      },
      where: {
        userId: uid,
      },
    });
  }

  async getXp(uid: string) {
    return await this.prisma.user.findFirst({
      select: {
        xp: true
      },
      where: {
        id: uid
      },
    });
  }

  async deleteUser(
    uid: string,
  ) {
    this.prisma.$transaction(async (tx) => {
      try {
        return await tx.user.delete({
          where: {
            id: uid
          }
        });
      } catch (error) { }
    })
  }


  //   return await this.prisma.user.delete({
  //   where: {
  //     id: uid
  //   }
  // })


  async changeSettings(uid: string, dto: { data: { focus: boolean, anon: boolean } }) {
    return await this.prisma.user.update({
      where: {
        id: uid
      },
      data: {
        focus: dto.data.focus,
        anon: dto.data.anon,
      }
    })

  }

  async getStreak(uid: string) {
    const streak = await this.prisma.user.findFirst({
      where: {
        id: uid
      },
      select: {
        streak: true
      }
    })
  }

  async getAnalytics(uid: string) {
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
    })
  }

  async getSubscriptionStatus(uid: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: uid
      },
      select: {
        lastPaymentAt: true,
        lastPackageExpiry: true,
      }
    })

    return user
  }

  async getHistory(uid: string, page: number) {
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
    })

    return answers
  }

  async getUserList() {
    return await this.prisma.user.findMany({})
  }

  async updateStreak(userId: string, correct: boolean) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId
      }
    })
    let xp = user.xp;
    const streak = correct ? (user?.streak || 0) + 1 : 0;
    if (correct) {
      if (streak > 3) {
        xp += 3
      }
      else
        xp += 2
    }

    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        streak: streak,
        xp: xp
      }
    })
    return streak
  }

  async getAll(page?: number) {
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
        // answers: true,
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
        { ...x, name: x.name ?? x.email }
    })
    return returnValue

  }


}
