import { Module } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { PaymobController } from './paymob.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [PaymobController],
  providers: [PaymobService],
  imports: [UserModule]
})
export class PaymobModule {}
