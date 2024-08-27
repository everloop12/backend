import { Body, Controller, Post, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EditProfileDto, SignUpDto } from './dto';
import { Role } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Patch('editProfile')
  @UseGuards(FirebaseAuthGuard)
  editProfile(@GetUser('uid') uid: string, @Body() dto: EditProfileDto) {
    return this.authService.changeProfileData(uid, dto);
  }

  // TODO: remove this endpoint
  @ApiOperation({ summary: 'For test purposes only' })
  @Post('set-role')
  async setRole(@Body('uid') uid: string, @Body('role') role: Role) {
    return this.authService.setUserRole(uid, role);
  }

  // @UseGuards(FirebaseAuthGuard)
  // @Patch('change-email')
  // async changeEmail(@GetUser('uid') uid: string, @Body() dto: ChangeEmailDto) {
  //   return this.authService.changeEmail(uid, dto.email);
  // }
}
