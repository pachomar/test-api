import { Body, Controller, Post } from '@nestjs/common';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { RequestNewPasswordDto } from '../dto/requestNewPassword.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: LoginDto) {
    return this.authService.login(req);
  }

  @Post('change-password')
  async changePassword(@Body() req: ChangePasswordDto) {
    return this.authService.changePassword(req);
  }

  @Post('request-password')
  async requestPassword(@Body() req: RequestNewPasswordDto) {
    return this.authService.requestPassword(req);
  }

  @Post('refresh-token')
  async exchangeRefreshToken(@Body() req: RefreshTokenDto) {
    return this.authService.exchangeRefreshToken(req);
  }
}
