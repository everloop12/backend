import { Module } from '@nestjs/common';
import { ReportSevice } from './report.service';
import { ReportContoller } from './report.controller';


@Module({
  controllers: [ReportContoller],
  providers: [ReportSevice]
})
export class ReportModule { }
