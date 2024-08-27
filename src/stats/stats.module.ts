import { Module } from '@nestjs/common';
import { StatsSevice } from './stats.service';
import { StatsContoller } from './stats.controller';


@Module({
  controllers: [StatsContoller],
  providers: [StatsSevice]
})
export class StatsModule { }
