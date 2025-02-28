import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppConfiguration } from 'src/config/configuration.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { RequestNewPasswordDto } from '../dto/requestNewPassword.dto';
import { LoginResponse, TokenPayload } from '../interfaces/auth.interface';
@Injectable()
export class AuthService {
  private appConfig: AppConfiguration;
  private logger = new Logger('AuhtService');
  constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) {
    this.appConfig = this.configService.get<AppConfiguration>('app');
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const checkPassword = await user.validatePassword(pass);

    if (!checkPassword) {
      this.logger.error({ message: 'Wrong Password.', user: email, operation: 'validateuser' });
      throw new UnauthorizedException('Wrong Password.');
    }
    return user;
  }

  async exchangeRefreshToken(params: RefreshTokenDto): Promise<LoginResponse> {
    const { refreshToken } = params;
    const isValid = await this.jwtService.verifyAsync(refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const decoded: any = this.jwtService.decode(refreshToken);

    if (!decoded || !decoded.userId) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.userService.findOne({ where: { id: decoded.userId } });
    if (!user) {
      this.logger.error({ message: 'Invalid credentials.', params, operation: 'exchangeRefreshToken' });
      throw new UnauthorizedException('Invalid credentials');
    }

    const refreshTokenPayload = { userId: user.id };

    const payload: TokenPayload = {
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: this.appConfig.jwtRefreshExpiration,
      }),
      user,
    };
  }

  async login(resp: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.findOne({ where: { email: resp.email } });
    if (!user) {
      this.logger.error({ message: 'Invalid credentials.', user: resp?.email, operation: 'login' });
      throw new UnauthorizedException('Invalid credentials');
    }
    const refreshTokenPayload = { userId: user.id };
    const payload: TokenPayload = {
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      // role: user.role,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: this.appConfig.jwtRefreshExpiration,
      }),
      user,
    };
  }

  async changePassword(query: ChangePasswordDto): Promise<User | undefined> {
    const user = await this.userService.findOne({
      where: { changePasswordToken: query.token },
    });
    if (!user) {
      this.logger.error({ message: 'Invalid credentials.', token: query?.token, operation: 'changePassword' });
      throw new UnauthorizedException('Invalid credentials');
    }

    user.password = query.password;
    await user.save();
    return user;
  }

  async requestPassword(body: RequestNewPasswordDto): Promise<User | undefined> {
    const user = await this.userService.findOne({ where: { email: body.email } });
    if (!user) {
      this.logger.error({ message: 'Invalid credentials.', email: body.email, operation: 'requestPassword' });
      throw new UnauthorizedException('Invalid credentials');
    }
    // const changePasswordToken = Math.random()
    //   .toString(36)
    //   .replace(/[^a-z]+/g, '')
    //   .substr(0, 10);

    // await this.userService.update(user._id.toHexString(), {
    //   changePasswordToken,
    // });

    return null;
    // return await this.userService.findOneById(user._id.toHexString());
  }
}
