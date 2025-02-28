import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { AppConfiguration } from './../../config/configuration.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('JwtStrategy');
  constructor(configService: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<AppConfiguration>('app').jwtSecret,
    });
  }

  /**
   * Validates parsed JWT token an returns a valid User
   *
   * @param payload - The decoded JWT content
   * @description Find more information about this at
   *  https://docs.nestjs.com/security/authentication#implementing-passport-jwt
   * @returns
   */
  async validate(payload: any): Promise<User> {
    try {
      const user = await this.userService.findOne({ where: { id: payload.id } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Error validating user token: ', error);
    }
  }
}
