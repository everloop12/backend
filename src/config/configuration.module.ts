import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
