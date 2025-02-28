import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { LoginResponse } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  Login(@Args('input') input: LoginDto): Promise<LoginResponse> {
    return this.authService.login(input);
  }

  // @Mutation()
  // RequestNewPassword(@Args('input') input: RequestNewPasswordDto): Promise<IMessageResponse> {
  //   return this.authService.requestNewPassword(input);
  // }

  @Query()
  ExchangeRefreshToken(@Args('input') input: RefreshTokenDto): Promise<LoginResponse> {
    return this.authService.exchangeRefreshToken(input);
  }
}
