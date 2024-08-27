import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    const config = configService.get('database');
    super({
      log: ['error'],
      datasources: {
        db: {
          url: config.DATABASE_URL,
        },
      },
    });
  }
}